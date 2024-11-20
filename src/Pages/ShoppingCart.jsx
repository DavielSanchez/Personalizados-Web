import TopBar from "../Components/TopBar";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Shopping_Car_Product from "../sub-components/Shopping_Car_Product";
import Cart_Summary from "../sub-components/Cart_Summary";
import Banner from "../Components/Banner";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import CircularProgress from '@mui/material/CircularProgress';

function ShoppingCar() {
    const [dataUser, setDataUser] = useState('');
    const [dataCart, setDataCart] = useState({ products: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [uid, setUid] = useState(null);
    const [userId, setUserId] = useState(null);
    const [numberOfProducts, setNumberOfProducts] = useState(0);

    const updateCart = async () => {
        await fetchCartData();
    };

    // Obtiene el usuario autenticado
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
                setUserId(result[0]._id);
            } else {
                // console.error("La API no devolvió datos válidos.");
            }
        } catch (error) {
            // console.error("Error al obtener los datos del usuario:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCartData = async () => {
        if (!userId) {
            // console.error("userId no está definido");
            return;
        }
    
        try {
            const urlShoppingCart = `${import.meta.env.VITE_API_LINK}/cart/${userId}`;
            const response = await fetch(urlShoppingCart);
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
    
            const result = await response.json();
            // console.log("Respuesta de la API:", result);
    
            if (Array.isArray(result) && result.length > 0) {
                const cartData = result[0];
                if (cartData.products && Array.isArray(cartData.products)) {
                    setDataCart(cartData);
                    setNumberOfProducts(cartData.numberOfProducts || 0);
                } else {
                    // console.error("La propiedad 'products' no es válida.");
                    setDataCart({ products: [] });
                }
            } else {
                // console.error("La estructura de datos no coincide con lo esperado.");
                setDataCart({ products: [] });
            }
        } catch (error) {
            // console.error("Error al obtener los datos del carrito:", error);
            setDataCart({ products: [] });
        }
    };

    return (
        <>
            <title>Personalizados Web | Shopping Cart</title>
            <TopBar />
            <NavBar />
            <Banner Current="Shopping Cart" Back="Shop" BackHref="/shop" />

            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5">

                                        <CircularProgress sx={{ color: '#FF9000' }} />
                                        </td>
                                    </tr>
                                ) : Array.isArray(dataCart.products) &&
                                  dataCart.products.length > 0 ? (
                                    dataCart.products.map((Producto) => (
                                        <Shopping_Car_Product key={Producto._id} product={Producto} userId={userId} onProductRemove={updateCart}/>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No hay productos en el carrito.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Cart_Summary Total={dataCart.totalPrice} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ShoppingCar;