import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Reviews from './Reviews';

import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

function Description(P) {
    const [data, setData] = useState(null);
    const [allReviews, setAllReviews] = useState([]); // Todas las reviews
    const [displayedReviews, setDisplayedReviews] = useState([]); // Reviews a mostrar
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [reviewsPerPage] = useState(3); // Límite de reviews por página
    
    const url = `${import.meta.env.VITE_API_LINK}/store/products/id/${P.productId}`;
    const urlReview = `${import.meta.env.VITE_API_LINK}/reviews/${P.productId}`; // Sin paginación

    useEffect(() => {
        fetchData();
    }, []);

    // Efecto para manejar la paginación local
    useEffect(() => {
        if (allReviews.length > 0) {
            const startIndex = (currentPage - 1) * reviewsPerPage;
            const endIndex = startIndex + reviewsPerPage;
            setDisplayedReviews(allReviews.slice(startIndex, endIndex));
        }
    }, [allReviews, currentPage, reviewsPerPage]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(url);
            const response_Reviews = await fetch(urlReview);
            
            if (!response.ok || !response_Reviews.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            
            const result = await response.json();
            const result_Reviews = await response_Reviews.json();
            
            console.log("Datos del producto:", result);
            console.log("Datos de reviews:", result_Reviews);
            
            if (result && result._id) {
                setData(result);
            } else {
                console.log("No se encontró el producto");
                setData(null);
            }
            
            // Obtener todas las reviews de una vez
            let reviewsData = [];
            if (result_Reviews && result_Reviews.docs && result_Reviews.docs.docs && Array.isArray(result_Reviews.docs.docs)) {
                reviewsData = result_Reviews.docs.docs;
            } else if (result_Reviews && Array.isArray(result_Reviews)) {
                reviewsData = result_Reviews;
            } else if (result_Reviews && result_Reviews.reviews && Array.isArray(result_Reviews.reviews)) {
                reviewsData = result_Reviews.reviews;
            }
            
            setAllReviews(reviewsData);
            
        } catch (error) {
            console.error("Error fetching data:", error);
            setData(null);
            setAllReviews([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Función para renderizar estrellas basadas en la calificación
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
        }
        
        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }
        
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }
        
        return stars;
    };

    // Calcular información de paginación
    const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

    // Mostrar loading mientras se cargan los datos
    if (isLoading) {
        return (
            <div className="row px-xl-5">
                <div className="text-center">
                    <p>Cargando...</p>
                </div>
            </div>
        );
    }

    // Mostrar mensaje si no hay datos del producto
    if (!data) {
        return (
            <div className="row px-xl-5">
                <div className="text-center">
                    <p>No se encontró información del producto.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="row px-xl-5">
                <Tabs defaultActiveKey="Descripcion" id="uncontrolled-tab-example" className="mb-3">
                    <Tab className='show' eventKey="Descripcion" title="Descripcion">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <h4 className="mb-3">Descripción del Producto</h4>
                            <p>{data.productDescription || "No hay descripción disponible."}</p>
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="Reviews y Comentarios">
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className="mb-4">
                                    Reviews para {data.productName} 
                                    <small className="text-muted ml-2">
                                        ({allReviews.length} total)
                                    </small>
                                </h4>
                                
                                {displayedReviews.length > 0 ? (
                                    displayedReviews.map((rev) => (
                                        <div className="media mb-4" key={rev._id}>
                                            <img
                                                src="../../public/img/Avatar.jpg"
                                                alt="Avatar"
                                                className="img-fluid mr-3 mt-1"
                                                style={{ width: '45px' }}
                                            />
                                            <div className="media-body">
                                                <h6>
                                                    {rev.name || 'Usuario'}<small> - <i>
                                                        {formatDistanceToNow(new Date(rev.reviewDate), { 
                                                            addSuffix: true, 
                                                            locale: es 
                                                        })}
                                                    </i></small>
                                                </h6>
                                                <div className="text-primary mb-2">
                                                    {renderStars(rev.reviewRating || 0)}
                                                </div>
                                                <p>{rev.reviewContent || 'Sin contenido'}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay reviews disponibles para este producto.</p>
                                )}
                                
                                {allReviews.length > 0 && (
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className={`page-item ${!hasPrevious ? 'disabled' : ''}`}>
                                                <button 
                                                    type="button"
                                                    className="page-link" 
                                                    onClick={handlePrevious}
                                                    disabled={!hasPrevious}
                                                >
                                                    Previous
                                                </button>
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link">
                                                    Página {currentPage} de {totalPages}
                                                </span>
                                            </li>
                                            <li className={`page-item ${!hasNext ? 'disabled' : ''}`}>
                                                <button 
                                                    type="button"
                                                    className="page-link" 
                                                    onClick={handleNext}
                                                    disabled={!hasNext}
                                                >
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                )}
                            </div>
                            <div className="col-md-6">
                                <Reviews productId={data._id} onReviewAdded={fetchData} />
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

export default Description;