import {React, useState, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function OfferProducts() {

  const MySwal = withReactContent(Swal)
    
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [uid, setUid] = useState(null);
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productColor, setProductColor] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productSize, setProductSize] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    
    
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

      useEffect(() => {
          fetchData();
      }, []);
      
    const fetchData = async () => {
        try{
            const url = `${import.meta.env.VITE_API_LINK}/products/offer/true`
            const response = await fetch(url)
            const result = await response.json()
            setData(result)
            console.log(result)
        }
        catch (error){
            // console.error(error)
        }
    }

    const addToCart = async (product) => {
      try {
          const dataProduct = {
              userId,
              productId: product._id,
              productName: product.productName,
              productColor: product.productColor,
              productImage: product.productMainImage,
              productSize: product.productSize,
              productQuantity: 1,
              productPrice: product.productDiscount || product.productPrice,
          };
  
          const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/add`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dataProduct),
          });
  
          if (!response.ok) {
              throw new Error('Error al agregar al carrito');
          }
  
          const responseData = await response.json();
          MySwal.fire({
              icon: "success",
              title: "El producto se agregó a tu carrito.",
              showConfirmButton: false,
              timer: 1500,
          });
      } catch (error) {
          MySwal.fire({
              icon: "error",
              title: "Error al agregar el producto.",
              text: error.message,
          });
      }
  }



  return (
    <>
    <div className="container-fluid pt-5">
        <div className="text-center mb-4">
            <h2 className="section-title px-5"><span className="px-2">Productos en Oferta</span></h2>
        </div>
        <div className="row px-xl-5 pb-3">
            
        <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        spaceBetween={25}
        loop={true}
        centeredSlides={true}
        grabCursor={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          520: {
            slidesPerView: 2,
          },
          950: {
            slidesPerView: 3,
          },
        }}
      >
        {data.map((P) => (
          <SwiperSlide key={P._id}>
            <div className="card mb-5">
              <div className="image-content">
                <span className="overlay"></span>
                <div className="card-image">
                  <img src={P.productMainImage} alt="" className="card-img" />
                </div>
              </div>
              <div className="card-content">
              <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 className="text-truncate mb-3">{P.productName}</h6>
                        <div className="d-flex justify-content-center">
                            <h6>RD${new Intl.NumberFormat().format(P.productDiscount)}</h6><h6 className="text-danger ml-2"><del>RD${new Intl.NumberFormat().format(P.productPrice)}</del></h6>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link 
                    to={{
                        pathname: `/product/${P.ID}`,
                        hash: '#search',
                    }} 
                    className="btn btn-sm text-dark p-0" 
                    state={{ productId: P._id, userId: userId }}>
                        <i className="fas fa-eye text-primary mr-1" ></i>View Details
                        </Link>
                        <button to="" className="btn btn-sm text-dark p-0" onClick={() => addToCart(P)}><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</button>
                        {/* <addToShoppingCart  /> */}
                        
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="swiper-button-next swiper-navBtn"></div>
      <div className="swiper-button-prev swiper-navBtn"></div> */}
      <div className="swiper-pagination"></div>

        </div>
    </div>
    </>
  )
}

export default OfferProducts