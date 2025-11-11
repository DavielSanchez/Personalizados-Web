import { useEffect, useState } from 'react';
import '../../public/css/detail_carousel.css';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Product_Detail_Carousel() {
    const location = useLocation();
    const { productId } = location.state;

    const [data, setData] = useState(null);
    const url = `${import.meta.env.VITE_API_LINK}/store/products/id/${productId}`;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log("Datos del producto:", result); // Para debug
            
            // CORRECCIÓN: result es un objeto, no un array
            if (result && result._id) {
                setData(result);
            } else {
                console.log("No se encontró el producto.");
                setData(null);
            }
        } catch (error) {
            console.error(error);
            setData(null);
        }
    };

    if (!data) return( 
        <>
            <div className="container">
                <div className="featured-wrapper">
                    <ul className="featured-list">
                        <Skeleton variant="rectangular" width="100%">
                            <div style={{ paddingTop: '57%' }} />
                        </Skeleton>
                    </ul>
                    <ul className="arrows"></ul>
                    <ul className="dots"></ul>
                </div>
                <ul className="thumb-list">
                    {[1, 2, 3].map((item) => (
                        <li key={item}>
                            <label htmlFor='image'>
                                <Skeleton variant="rectangular" width="100%">
                                    <div style={{ paddingTop: '57%' }} />
                                </Skeleton>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

    // Verificar que hay imágenes disponibles
    const productImages = data.productImages && Array.isArray(data.productImages) ? data.productImages : [];
    
    // Si no hay imágenes, mostrar un mensaje o imagen por defecto
    if (productImages.length === 0) {
        return (
            <div className="container">
                <div className="featured-wrapper">
                    <ul className="featured-list">
                        <li>
                            <figure>
                                <img 
                                    className='img' 
                                    src={data.productMainImage || '/img/placeholder.jpg'} 
                                    alt={data.productName} 
                                />
                            </figure>
                        </li>
                    </ul>
                </div>
                <p className="text-center text-muted mt-3">No hay imágenes adicionales disponibles</p>
            </div>
        );
    }

    return (
        <>
            {productImages.map((_, index) => (
                <input 
                    key={index} 
                    type="radio" 
                    id={`image${index + 1}`} 
                    name="image" 
                    defaultChecked={index === 0}
                />
            ))}

            <div className="container">
                <div className="featured-wrapper">
                    <ul className="featured-list">
                        {productImages.map((image, index) => (
                            <li key={index}>
                                <figure>
                                    <img 
                                        className='img' 
                                        src={image} 
                                        alt={`${data.productName} - Imagen ${index + 1}`}
                                        onError={(e) => {
                                            // Si la imagen falla al cargar, usar imagen principal o placeholder
                                            e.target.src = data.productMainImage || '/img/placeholder.jpg';
                                        }}
                                    />
                                </figure>
                            </li>
                        ))}
                    </ul>
                    <ul className="arrows">
                        {productImages.map((_, index) => (
                            <li key={index}>
                                <label htmlFor={`image${index + 1}`}></label>
                            </li>
                        ))}
                    </ul>
                    <ul className="dots">
                        {productImages.map((_, index) => (
                            <li key={index}>
                                <label htmlFor={`image${index + 1}`}></label>
                            </li>
                        ))}
                    </ul>
                </div>
                <ul className="thumb-list">
                    {productImages.map((image, index) => (
                        <li key={index}>
                            <label htmlFor={`image${index + 1}`}>
                                <img 
                                    className='img' 
                                    src={image} 
                                    alt={`Thumbnail ${index + 1}`}
                                    onError={(e) => {
                                        e.target.src = data.productMainImage || '/img/placeholder.jpg';
                                    }}
                                />
                                <span className="outer">
                                    <span className="inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye-fill text-secondary" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                        </svg>
                                    </span>
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Product_Detail_Carousel;