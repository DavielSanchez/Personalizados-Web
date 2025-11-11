import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getAuth } from "firebase/auth";
import withReactContent from 'sweetalert2-react-content'

function Product_Detail_Info(P) {
    const MySwal = withReactContent(Swal)

    const location = useLocation()
    const { productId } = location.state
    const [quantity, setQuantity] = useState(1)
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [variants, setVariants] = useState([])

    const [data, setData] = useState(null)
    const [userId, setUserId] = useState(P.userId);
    const [uid, setUid] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedVariantImage, setSelectedVariantImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setIsLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const url = `${import.meta.env.VITE_API_LINK}/store/products/id/${productId}`

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(url)
            const result = await response.json()
            console.log("Datos del producto:", result)
            
            if (result && result._id) {
                setData(result)
                setColors(result.productColors || [])
                setSizes(result.productSizes || [])
                setVariants(result.variants || [])
                
                // Si hay variantes, seleccionar la primera por defecto
                if (result.variants && result.variants.length > 0) {
                    const firstVariant = result.variants[0];
                    setSelectedColor(firstVariant.color);
                    setSelectedSize(firstVariant.size);
                    setSelectedVariantImage(firstVariant.image);
                }
            } else {
                console.log("No se encontró el producto")
                setData(null)
            }
        } catch (error) {
            console.error(error)
            setData(null)
        }
    }

    const handleColorChange = (color) => {
        setSelectedColor(color);
        
        // Buscar la variante que coincida con el color seleccionado
        const matchingVariant = variants.find(variant => 
            variant.color === color && 
            (selectedSize ? variant.size === selectedSize : true)
        );
        
        if (matchingVariant) {
            setSelectedVariantImage(matchingVariant.image);
        } else {
            // Si no hay variante que coincida, usar la imagen principal
            setSelectedVariantImage(data?.productMainImage);
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        
        // Buscar la variante que coincida con el tamaño seleccionado
        const matchingVariant = variants.find(variant => 
            variant.size === size && 
            (selectedColor ? variant.color === selectedColor : true)
        );
        
        if (matchingVariant) {
            setSelectedVariantImage(matchingVariant.image);
        }
    };

    const getVariantPrice = () => {
        if (!data) return 0; // Validación para cuando data es null
        
        if (selectedColor && selectedSize) {
            const matchingVariant = variants.find(variant => 
                variant.color === selectedColor && variant.size === selectedSize
            );
            if (matchingVariant) {
                return matchingVariant.price;
            }
        }
        return data.productPrice || 0;
    };

    const getVariantStock = () => {
        if (!data) return 0; // Validación para cuando data es null
        
        if (selectedColor && selectedSize) {
            const matchingVariant = variants.find(variant => 
                variant.color === selectedColor && variant.size === selectedSize
            );
            if (matchingVariant) {
                return matchingVariant.stock;
            }
        }
        return data.productStock || 0;
    };

    const dataProduct = {
        userId: P.userId,
        productId: data?._id,
        productName: data?.productName,
        productColor: selectedColor || 'N/A',
        productImage: selectedVariantImage || data?.productMainImage,
        productSize: selectedSize || 'N/A',
        productQuantity: quantity,
        productPrice: getVariantPrice(),
    };

    const addToCart = async (e) => {
        e.preventDefault();

        if (!data) {
            MySwal.fire({
                icon: "error",
                title: "Error",
                text: "No hay datos del producto disponibles",
                showConfirmButton: true,
            });
            return;
        }

        if (!P.userId) {
            MySwal.fire({
                icon: "error",
                title: "Debes iniciar sesión",
                text: "Necesitas estar logueado para agregar productos al carrito",
                showConfirmButton: true,
            });
            return;
        }

        if (!selectedColor) {
            MySwal.fire({
                icon: "error",
                title: "Selecciona un color",
                text: "Por favor selecciona un color para el producto",
                showConfirmButton: true,
            });
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataProduct), 
            });

            if (!response.ok) {
                throw new Error('Error al enviar el post');
            }
            const responseData = await response.json();

            MySwal.fire({
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
            console.error('Error:', error);
            MySwal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo agregar el producto al carrito",
                showConfirmButton: true,
            });
        }
    }

    // Mostrar loading mientras se cargan los datos
    if (!data) {
        return (
            <div className="col-lg-7 pb-5">
                <div className="text-center">
                    <p>Cargando producto...</p>
                </div>
            </div>
        );
    }

    const currentPrice = getVariantPrice();
    const currentStock = getVariantStock();

    // Función para renderizar el contenido común
    const renderProductContent = (isOnOffer = false) => (
        <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{data.productName || "Nombre no disponible"}</h3>
            <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                    <small className="fas fa-star"></small>
                    <small className="fas fa-star"></small>
                    <small className="fas fa-star"></small>
                    <small className="fas fa-star-half-alt"></small>
                    <small className="far fa-star"></small>
                </div>
                <small className="pt-1">(50 Reviews)</small>
            </div>
            
            {/* Precio */}
            {isOnOffer ? (
                <h3 className="font-weight-semi-bold mb-4">
                    RD${new Intl.NumberFormat().format(currentPrice - (data.productDiscount || 0))}
                    <span className="text-danger font-weight-medium h5 ms-3">
                        <del>RD${new Intl.NumberFormat().format(currentPrice)}</del>
                    </span>
                </h3>
            ) : (
                <h3 className="font-weight-semi-bold mb-4">
                    RD${new Intl.NumberFormat().format(currentPrice)}
                </h3>
            )}
            
            <p className="mb-4">{data.productSummary || "Descripción no disponible"}</p>
            
            {/* Stock disponible */}
            <div className="mb-3">
                <small className={`font-weight-medium ${currentStock > 10 ? 'text-success' : currentStock > 0 ? 'text-warning' : 'text-danger'}`}>
                    {currentStock > 10 ? 'En stock' : currentStock > 0 ? `Solo ${currentStock} disponibles` : 'Agotado'}
                </small>
            </div>
            
            {/* Tamaños */}
            {sizes.length > 0 && (
                <div className="d-flex mb-4">
                    <p className="text-dark font-weight-medium mb-0 mr-3">Tamaños:</p>
                    <form>
                        {sizes.map((size, index) => (
                            <div key={index} className="custom-control custom-radio custom-control-inline">
                                <input 
                                    type="radio" 
                                    className="custom-control-input" 
                                    id={`size-${index}`} 
                                    name="size" 
                                    checked={selectedSize === size}
                                    onChange={() => handleSizeChange(size)}
                                />
                                <label className="custom-control-label" htmlFor={`size-${index}`}>
                                    {size}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            )}
            
            {/* Colores */}
            {colors.length > 0 && (
                <div className="d-flex mb-4">
                    <p className="text-dark font-weight-medium mb-0 mr-3">Colores:</p>
                    <form>
                        {colors.map((color, index) => (
                            <div key={index} className="custom-control custom-radio custom-control-inline">
                                <input 
                                    type="radio" 
                                    className="custom-control-input" 
                                    id={`color-${index}`} 
                                    name="color" 
                                    checked={selectedColor === color}
                                    onChange={() => handleColorChange(color)}
                                />
                                <label className="custom-control-label" htmlFor={`color-${index}`}>
                                    {color}
                                    {selectedColor === color && selectedVariantImage && (
                                        <small className="text-muted ml-1">✓</small>
                                    )}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            )}
            
            {/* Cantidad y agregar al carrito */}
            <div className="d-flex align-items-center mb-4 pt-2">
                <div className="input-group quantity mr-3" style={{width: '130px'}}>
                    <div className="input-group-btn">
                        <button 
                            className="btn btn-primary btn-minus" 
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            <i style={{color: '#fff'}} className="fa fa-minus"></i>
                        </button>
                    </div>
                    <input 
                        type="text" 
                        className="form-control bg-secondary text-center" 
                        value={quantity}
                        readOnly
                    />
                    <div className="input-group-btn">
                        <button 
                            className="btn btn-primary btn-plus" 
                            onClick={() => setQuantity(quantity + 1)}
                            disabled={quantity >= currentStock}
                        >
                            <i style={{color: '#fff'}} className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button 
                    className="btn btn-primary px-3" 
                    style={{color: '#fff'}}
                    onClick={addToCart}
                    disabled={currentStock === 0 || !selectedColor}
                >
                    <i  className="fa fa-shopping-cart mr-3"></i> 
                    {currentStock === 0 ? 'Agotado' : !selectedColor ? 'Selecciona color' : 'Agregar al Carrito'}
                </button>
            </div>
            
            <div className="d-flex pt-2">
                <p className="text-dark font-weight-medium mb-0 mr-2">Compartir:</p>
                <div className="d-inline-flex">
                    <a className="text-dark px-2" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="text-dark px-2" href=""><i className="fab fa-twitter"></i></a>
                    <a className="text-dark px-2" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="text-dark px-2" href=""><i className="fab fa-pinterest"></i></a>
                </div>
            </div>
        </div>
    );

    // Renderizar según si tiene oferta o no
    return data.productOffer ? renderProductContent(true) : renderProductContent(false);
}

export default Product_Detail_Info;