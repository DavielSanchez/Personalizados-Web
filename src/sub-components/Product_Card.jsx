import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Product_Card(P) {
    const MySwal = withReactContent(Swal)

    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [uid, setUid] = useState(null);

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
    
    useEffect(() => {
        if (uid) {
            fetchUserData(uid);
        }
    }, [uid]);
    
    const fetchUserData = async (uid) => {
        try {
            const urlUser = `${import.meta.env.VITE_API_LINK}/user/uid/${uid}`;
            const response = await fetch(urlUser);
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            const result = await response.json();
    
            if (Array.isArray(result) && result.length > 0) {
                setUserId(result[0]._id);
            } else {
                console.log('No se encontró el usuario');
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        } finally {
            setIsLoading(false);  
        }
    };

    const addToCart = async (e) => {
        e.preventDefault();

        if (!uid) {
            MySwal.fire({
                icon: "error",
                title: "Debes iniciar sesión",
                text: "Necesitas estar logueado para agregar productos al carrito",
                showConfirmButton: true,
            });
            return;
        }

        if (!userId) {
            MySwal.fire({
                icon: "warning",
                title: "Esperando datos del usuario...",
                text: "Por favor intenta de nuevo en un momento",
                showConfirmButton: true,
            });
            return;
        }

        const data = {
            userId: userId,
            productId: P.ID,
            productName: P.Title,
            productColor: P.Color || '',
            productImage: P.Image,
            productSize: P.Size || '',
            productQuantity: P.Quantity || 1,
            productPrice: P.Offer ? P.Discount : P.Price,
        };

        console.log('Enviando datos al carrito:', data);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data), 
            });
        
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error del servidor:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
        
            const responseData = await response.json(); 
            console.log('Respuesta del servidor:', responseData);
            
            MySwal.fire({
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1500
            });
            
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            MySwal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo agregar el producto al carrito. Intenta nuevamente.",
                showConfirmButton: true,
            });
        }
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
                            {P.Offer ? (
                                <>
                                    <h6>RD${new Intl.NumberFormat().format(P.Discount)}</h6>
                                    <h6 className="text-danger ml-2">
                                        <del>RD${new Intl.NumberFormat().format(P.Price)}</del>
                                    </h6>
                                </>
                            ) : (
                                <h6>RD${new Intl.NumberFormat().format(P.Price)}</h6>
                            )}
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                        <Link 
                            to={{
                                pathname: `/product/${P.ID}`,
                                hash: '#search',
                            }} 
                            className="btn btn-sm text-dark p-0" 
                            state={{ productId: P.ID, userId: userId }}
                        >
                            <i className="fas fa-eye text-primary mr-1"></i>View Details
                        </Link>
                        <button 
                            className="btn btn-sm text-dark p-0" 
                            onClick={addToCart}
                            disabled={isLoading || !userId}
                        >
                            <i className="fas fa-shopping-cart text-primary mr-1"></i>
                            {isLoading ? 'Cargando...' : 'Add To Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product_Card