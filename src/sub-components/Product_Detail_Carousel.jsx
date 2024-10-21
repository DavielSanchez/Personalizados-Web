import { useEffect, useState } from 'react';
import '../../public/css/detail_carousel.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useLocation } from 'react-router-dom';

function Product_Detail_Carousel() {
    const location = useLocation();
    const { productId } = location.state;

    const [data, setData] = useState(null); // Cambiado a null para manejar la verificación más adelante
    const url = `http://localhost:3000/products/id/${productId}`;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.length > 0) {
                setData(result[0]); // Suponiendo que el resultado es un array y tomamos el primer elemento
            } else {
                console.log("No se encontró el producto.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!data) return <div>Cargando...</div>; // Mensaje de carga hasta que se obtengan los datos

    return (
        <>
            {data.productImages.map((_, index) => (
                <input 
                    key={index} 
                    type="radio" 
                    id={`image${index + 1}`} 
                    name="image" 
                    defaultChecked={index === 0} // Marcar el primer radio como seleccionado por defecto
                />
            ))}

            <div className="container">
                <div className="featured-wrapper">
                    <ul className="featured-list">
                        {data.productImages.map((image, index) => (
                            <li key={index}>
                                <figure>
                                    <img className='img' src={image} alt={`Imagen ${index + 1}`} />
                                </figure>
                            </li>
                        ))}
                    </ul>
                    <ul className="arrows">
                        {data.productImages.map((_, index) => (
                            <li key={index}>
                                <label htmlFor={`image${index + 1}`}></label>
                            </li>
                        ))}
                    </ul>
                    <ul className="dots">
                        {data.productImages.map((_, index) => (
                            <li key={index}>
                                <label htmlFor={`image${index + 1}`}></label>
                            </li>
                        ))}
                    </ul>
                </div>
                <ul className="thumb-list">
                    {data.productImages.map((image, index) => (
                        <li key={index}>
                            <label htmlFor={`image${index + 1}`}>
                                <img className='img' src={image} alt={`Thumbnail ${index + 1}`} />
                                <span className="outer">
                                    <span className="inner">
                                        <RemoveRedEyeIcon />
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
