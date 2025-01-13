import { Badge } from '@mui/material';
import User from './user.jsx';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Search() {

    const [dataUser, setDataUser] = useState('');
    const [dataCart, setDataCart] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [uid, setUid] = useState(null);
    const [userId, setUserId] = useState(null)
    const [numberOfProducts, setNumberOfProducts] = useState(0)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUid(user.uid); // Establece el UID una vez que está disponible
            } else {
                console.error("No se encontró un usuario autenticado.");
                setIsLoading(false); // Finaliza la carga si no hay usuario
            }
        });
    
        return () => unsubscribe(); // Limpia el listener cuando se desmonta el componente
    }, []);
    
    useEffect(() => {
        if (uid) {
            fetchUserData(uid);
        }
    }, [uid]);

    useEffect(() => {
        if (userId) {
            fetchCartData();
        }
    }, [userId]);
    
    const fetchUserData = async (userUid) => {
        try {
            const urlUser = `${import.meta.env.VITE_API_LINK}/user/uid/${userUid}`;
            const response = await fetch(urlUser);
            
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            const result = await response.json();
    
            if (Array.isArray(result) && result.length > 0) {
                setDataUser(result);
                setUserId(result[0]._id);  // Aquí es donde se establece userId
            } else {
                console.error("La API no devolvió datos válidos.");
            }
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
        } finally {
            setIsLoading(false); // Finaliza la carga
        }
    };

    const fetchCartData = async () => {
        if (!userId) {
            console.error("userId no está definido");
            return;  // No hacer la solicitud si userId es nulo o indefinido
        }
        
        try {
            const urlShoppingCart = `${import.meta.env.VITE_API_LINK}/cart/${userId}`;
            const response = await fetch(urlShoppingCart);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            const result = await response.json();
            if (Array.isArray(result) && result.length > 0) {
                setDataCart(result);
                setNumberOfProducts(result[0].numberOfProducts)
            } else {
                console.error("La API no devolvió datos válidos.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    
    

  return (
    <>
    <div className="row align-items-center py-3 px-xl-5 d-flex justify-content-between" id='search'>
            <div className="col-lg-3 d-none d-lg-block ">
                <a href="/" className="text-decoration-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">
                        {/* <img src="../../public/img/Logo.png" className='image-fluid' alt="" width={'50px'}/> */}
                        P
                    </span>Shop</h1>
                </a>
            </div>
            {/* <div className="col-lg-6 col-6 text-left">
                <form action="">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for products"/>
                        <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div> */}
            <div className="col-lg-3 col-6 text-right">
            <Link
                  to={{ pathname: `/shoppingcart`}}
                  state={{ userId: userId }}
                >
                  <Badge badgeContent={numberOfProducts} color="primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart3 text-primary" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                    </Badge>
                </Link>
                <a className="btn">
                <User/>
                </a>
            </div>
        </div>
    </>
  )
}

export default Search
