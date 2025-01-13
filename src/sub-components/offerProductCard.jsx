import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";

function offerProductCard(P) {
  return (
    <>
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
                            <h6>RD${new Intl.NumberFormat().format(P.productPrice - P.productDiscount)}</h6><h6 className="text-muted ml-2"><del>RD${new Intl.NumberFormat().format(P.productPrice)}</del></h6>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link 
                    to="/product" 
                    className="btn btn-sm text-dark p-0" 
                    state={{ productId: P._id }}>
                        <i className="fas fa-eye text-primary mr-1" ></i>View Details
                        </Link>
                        <a href="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                    </div>
              </div>
            </div>
          </SwiperSlide>
    </>
  )
}

export default offerProductCard