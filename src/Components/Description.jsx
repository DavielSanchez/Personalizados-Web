import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Reviews from './Reviews';

import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

function Description(P) {
    const [data, setData] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreReviews, setHasMoreReviews] = useState(true);
    const url = `${import.meta.env.VITE_API_LINK}/products/id/${P.productId}`;
    const urlReview = `${import.meta.env.VITE_API_LINK}/reviews/${P.productId}?limit=3&page=${currentPage}`;

    useEffect(() => {
        fetchData();
    }, [currentPage]); // El efecto se ejecuta cada vez que cambie currentPage

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const response_Reviews = await fetch(urlReview);
            const result = await response.json();
            const result_Reviews = await response_Reviews.json();
            
            if (result && result_Reviews) {
                setData(result[0]);
                setReviews(result_Reviews.docs.docs);
                
                // Verificar si hay más reseñas para deshabilitar el botón "Next"
                setHasMoreReviews(result_Reviews.docs.docs.length > 0);
            } else {
                console.log(data);
                console.log(reviews);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasMoreReviews) {  // Solo permite avanzar si hay más reseñas
            setCurrentPage(currentPage + 1);
        }
    };


    return (
        <>
            <div className="row px-xl-5">
                <Tabs defaultActiveKey="Descripcion" id="uncontrolled-tab-example" className="mb-3">
                    <Tab className='show' eventKey="Descripcion" title="Descripcion">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <h4 className="mb-3">Descripción del Producto</h4>
                            <p>{data.productDescription}</p>
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="Reviews y Comentarios">
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className="mb-4">Reviews para {data.productName}</h4>
                                {
                                    reviews.map((rev) => (
                                        <div className="media mb-4" key={rev.id}>
                                            <img
                                                src="../../public/img/Avatar.jpg"
                                                alt="Image"
                                                className="img-fluid mr-3 mt-1"
                                                style={{ width: '45px' }}
                                            />
                                            <div className="media-body">
                                                <h6>{rev.name}<small> - <i>{formatDistanceToNow(new Date(rev.reviewDate), { addSuffix: true, locale: es })}</i></small></h6>
                                                <div className="text-primary mb-2">
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                </div>
                                                <p>{rev.reviewContent}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link" onClick={handlePrevious}>Previous</a>
                                        </li>
                                        <li className="page-item"><a className="page-link">{currentPage}</a></li>
                                        <li className={`page-item ${!hasMoreReviews ? 'disabled' : ''}`}>
                                            <a className="page-link" onClick={handleNext}>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-md-6">
                                <Reviews productId = {data._id} />
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

export default Description;
