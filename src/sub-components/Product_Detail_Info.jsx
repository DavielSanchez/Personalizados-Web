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

    const [data, setData] = useState([])
    const [userId, setUserId] = useState(P.userId);
    const [uid, setUid] = useState(null);
    // const [productId, setProductId] = useState();
    const [productName, setProductName] = useState(data.productName);
    const [productColor, setProductColor] = useState(null);
    const [productImage, setProductImage] = useState(data.productMainImage);
    const [productSize, setProductSize] = useState();
    const [productQuantity, setProductQuantity] = useState(quantity);
    // const [productPrice, setProductPrice] = useState();

    useEffect(() => {
            const auth = getAuth();
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setUid(user.uid);
                } else {
                    // console.error("No se encontró un usuario autenticado.");
                    setIsLoading(false);
                }
            });
    
            return () => unsubscribe();
        }, []);


    const url = `${import.meta.env.VITE_API_LINK}/products/id/${productId}`

    useEffect(() => {
        fetchData();
        // console.log(data)
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const result = await response.json()
            if(result != []){
                setData(result[0])
                setColors(result[0].productColors)
                setSizes(result[0].productSizes)
                
                
            }else{
                // console.log(data)
            }
        }
        catch (error){
            console.error(error)
        }
    }

    const handleColorChange = (color) => {
        setProductColor(color);
      };

      const handleSizeChange = (size) => {
        setProductSize(size);
      };

      const dataProduct = {
        userId: P.userId,
        productId: data._id,
        productName: data.productName,
        productColor: productColor || 'N/A',
        productImage: data.productMainImage,
        productSize: productSize || 'N/A',
        productQuantity: quantity,
        productPrice: data.productPrice,
    };

    const addToCart = async (e) => {

        e.preventDefault();

        if (P.userId != null) {
            if (productColor != null) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/add`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(dataProduct), 
                    });

                    if (!response.ok) {
                        console.log(P.userId)
                        throw new Error('Error al enviar el post');
                    }
                    console.log(P.userId)
                    console.log(dataProduct)
                    const responseData  = await response.json();
        
                    MySwal.fire({
                        icon: "success",
                        title: "El producto se agrego a tu carrito.",
                        showConfirmButton: false,
                        timer: 2000
                      });
                    
                    } catch (error) {
                    console.error('Error:', error);
                    }
            } else{
                MySwal.fire({
                    icon: "error",
                    title: "Selecciona un color para el producto.",
                    showConfirmButton: false,
                    showDenyButton: true,
                    denyButtonText: `Cancelar`
                  });
            }
        }else{

        }
    }

    if (data.productOffer === true) {
        return(
        <div className="col-lg-7 pb-5">
                <h3 className="font-weight-semi-bold">{data.productName}</h3>
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
                <h3 className="font-weight-semi-bold mb-4">RD${new Intl.NumberFormat().format(data.productPrice - data.productDiscount)}<span className="text-danger font-weight-medium h5 ms-3"><del>RD${new Intl.NumberFormat().format(data.productPrice)}</del></span></h3>
                <p className="mb-4">{data.productSummary}</p>
                <div className="d-flex mb-4">
                    <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                    <form>
                        {sizes.map((size, index) => (
                            <div key={index} className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id={`size-${index}`} name="size" 
                                onChange={() => {
                                    handleSizeChange(size)
                                }}
                                />
                                <label className="custom-control-label" htmlFor={`size-${index}`}>{size}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="d-flex mb-4">
                    <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                    <form>
                        {colors.map((color, index) => (
                            <div key={index} className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id={`color-${index}`} name="color" 
                                onChange={() => {
                                    handleColorChange(color)
                                }}
                                />
                                <label className="custom-control-label" htmlFor={`color-${index}`}>{color}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="d-flex align-items-center mb-4 pt-2">
                    <div className="input-group quantity mr-3" style={{width: '130px'}}>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-minus" onClick={() => {
                        if(quantity <= 1){
                            // alert('error')
                        }
                        else{
                        setQuantity(quantity - 1)
                        }}} value={quantity}>
                            <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control bg-secondary text-center" value={quantity}/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus" onClick={() => {
                setQuantity(quantity + 1)
                console.log(quantity)
                }}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary px-3" onClick={addToCart}><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                </div>
                <div className="d-flex pt-2">
                    <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                    <div className="d-inline-flex">
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
            </div>            
    )}
    


  return (
    <>
    <div className="col-lg-7 pb-5">
                <h3 className="font-weight-semi-bold">{data.productName}</h3>
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
                <h3 className="font-weight-semi-bold mb-4">RD${new Intl.NumberFormat().format(data.productPrice)}</h3>
                <p className="mb-4">{data.productSummary}</p>
                <div className="d-flex mb-4">
                    <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                    <form>
                        {sizes.map((size, index) => (
                            <div key={index} className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id={`size-${index}`} name="size" 
                                onChange={() => {
                                    handleSizeChange(size)
                                }}
                                />
                                <label className="custom-control-label" htmlFor={`size-${index}`}>{size}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="d-flex mb-4">
                    <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                    <form>
                        {colors.map((color, index) => (
                            <div key={index} className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id={`color-${index}`} name="color" 
                                onChange={() => {
                                    handleColorChange(color)
                                }}
                                />
                                <label className="custom-control-label" htmlFor={`color-${index}`}>{color}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="d-flex align-items-center mb-4 pt-2">
                    <div className="input-group quantity mr-3" style={{width: '130px'}}>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-minus" onClick={() => {
                        if(quantity <= 1){
                            // alert('error')
                        }
                        else{
                        setQuantity(quantity - 1)
                        }}} value={quantity}>
                            <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control bg-secondary text-center" value={quantity}/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus" onClick={() => {
                setQuantity(quantity + 1)
                console.log(quantity)
                }}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary px-3" onClick={addToCart}><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                </div>
                <div className="d-flex pt-2">
                    <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                    <div className="d-inline-flex">
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Product_Detail_Info


// try {
//     const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/add`, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json', 
//         },
//         body: JSON.stringify(dataProduct), 
//     });

//     if (!response.ok) {
//         throw new Error('Error al enviar el post');
//         console.log(Error)
//     }

//     const responseData  = await response.json(); 
//     console.log(responseData)
//     console.log(quantity)

//     MySwal.fire({
//         icon: "success",
//         title: "El producto se agrego a tu carrito.",
//         showConfirmButton: false,
//         timer: 2000
//       });
    
//     } catch (error) {
//     console.error('Error:', error);
//     }