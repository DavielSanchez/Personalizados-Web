import { useState, useEffect } from "react"
// import addToShoppingCart from "./addToShoppingCart";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function Product_Card(P) {

    const MySwal = withReactContent(Swal)

    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState(P.ID);
    const [productName, setProductName] = useState(P.Title);
    const [productColor, setProductColor] = useState(P.Color);
    const [productImage, setProductImage] = useState(P.Image);
    const [productSize, setProductSize] = useState(P.Size);
    const [productQuantity, setProductQuantity] = useState(P.Quantity);
    const [productPrice, setProductPrice] = useState(P.Price);
    const [productDiscount, setProductDiscount] = useState(P.Discount)

    const [isLoading, setIsLoading] = useState(true);
    const [uid, setUid] = useState(null);

    let data;

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setIsLoading(false);
            }
        });
    
        // Limpiar el efecto
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        if (uid) {
            fetchUserData(uid);
        }
    }, [uid]);
    
    const fetchUserData = async (userUid) => {
        try {
            const urlUser = `${import.meta.env.VITE_API_LINK}/user/uid/${userUid}`;
            const response = await fetch(urlUser);
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            const result = await response.json();
    
            if (Array.isArray(result) && result.length > 0) {
                setUserId(result[0]._id);
            } else {
            }
        } catch (error) {
        } finally {
            setIsLoading(false);  
        }
    };




    if (P.Offer === true) {
        data = {
            userId: userId,
            productId: productId,
            productName: productName,
            productColor: productColor,
            productImage: productImage,
            productSize: productSize,
            productQuantity: productQuantity,
            productPrice: productDiscount,
        };
    }else{
        data = {
            userId: userId,
            productId: productId,
            productName: productName,
            productColor: productColor,
            productImage: productImage,
            productSize: productSize,
            productQuantity: productQuantity,
            productPrice: productPrice,
        };
    }

    const addToCart = async (e) => {

        e.preventDefault();

        if (userId != null) {
            try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/add`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data), 
            });
        
            if (!response.ok) {
                throw new Error('Error al enviar el post');
            }
        
            const responseData  = await response.json(); 
            MySwal.fire({
                icon: "success",
                title: "El producto se agrego a tu carrito.",
                showConfirmButton: false,
                timer: 1500
              });
            
            } catch (error) {
            console.error('Error:', error);
            }
        }else{

        }
    }

    if (P.Offer === true) {
        return (
            <>
        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
            <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img className="img-fluid w-100" src={P.Image} alt=""/>
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{P.Title}</h6>
                    <div className="d-flex justify-content-center">
                        <h6>RD${new Intl.NumberFormat().format(P.Discount)}</h6><h6 className="text-danger ml-2"><del>RD${new Intl.NumberFormat().format(P.Price)}</del></h6>
                        {/* <h6 className="text-muted ml-2">
                            <del>${new Intl.NumberFormat().format()}</del>
                        </h6> */}
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link 
                    to="/product" 
                    className="btn btn-sm text-dark p-0" 
                    state={{ productId: P.ID, userId: userId }}>
                        <i className="fas fa-eye text-primary mr-1" ></i>View Details
                        </Link>
                        <button to="" className="btn btn-sm text-dark p-0" onClick={addToCart}><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</button>
                        {/* <addToShoppingCart  /> */}
                        
                </div>
            </div>
        </div>
    </>
        )
    }

  return (
    <>
        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
            <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img className="img-fluid w-100" src={P.Image} alt=""/>
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{P.Title}</h6>
                    <div className="d-flex justify-content-center">
                        <h6>RD${new Intl.NumberFormat().format(P.Price)}</h6>
                        {/* <h6 className="text-muted ml-2">
                            <del>${new Intl.NumberFormat().format()}</del>
                        </h6> */}
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link 
                    to="/product" 
                    className="btn btn-sm text-dark p-0" 
                    state={{ productId: P.ID, userId: userId }}>
                        <i className="fas fa-eye text-primary mr-1" ></i>View Details
                        </Link>
                        <button to="" className="btn btn-sm text-dark p-0" onClick={addToCart}><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</button>
                        {/* <addToShoppingCart  /> */}
                        
                </div>
            </div>
        </div>
    </>
  )
}

export default Product_Card