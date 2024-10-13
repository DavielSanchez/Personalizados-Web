import '../../public/css/detail_carousel.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
function Product_Detail_Carousel() {
  return (
    <>
    {/* <div className="col-lg-5 pb-5">
                <div id="product-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner border">
                        <div className="carousel-item active">
                            <img className="w-100 h-100" src="img/product-1.jpg" alt="Image"/>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100 h-100" src="img/product-2.jpg" alt="Image"/>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100 h-100" src="img/product-3.jpg" alt="Image"/>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100 h-100" src="img/product-4.jpg" alt="Image"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                        <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                        <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
            </div> */}
            <input type="radio" id="image1" name="image" defaultChecked/>
            <input type="radio" id="image2" name="image"/>
            <input type="radio" id="image3" name="image"/>
            <input type="radio" id="image4" name="image"/>

            <div className="container">
            <div className="featured-wrapper">
                <ul className="featured-list ">
                <li>
                    <figure>
                    <img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/unsplash_nature4.jpg" alt=""/>
                    </figure>
                </li>
                <li>
                    <figure>
                    <img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/unsplash_nature11.jpg" alt=""/>
                    </figure>
                </li>
                <li>
                    <figure>
                    <img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/unsplash_nature6.jpg" alt=""/>
                    </figure>
                </li>
                <li>
                    <figure>
                    <img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/unsplash_nature7.jpg" alt=""/>
                    </figure>
                </li>
                </ul>
                <ul className="arrows">
                <li>
                    <label htmlFor="image1"></label>
                </li>
                <li>
                    <label htmlFor="image2"></label>
                </li>
                <li>
                    <label htmlFor="image3"></label>
                </li>
                <li>
                    <label htmlFor="image4"></label>
                </li>
                </ul>
                <ul className="dots">
                <li>
                    <label htmlFor="image1"></label>
                </li>
                <li>
                    <label htmlFor="image2"></label>
                </li>
                <li>
                    <label htmlFor="image3"></label>
                </li>
                <li>
                    <label htmlFor="image4"></label>
                </li>
                </ul>
            </div>
            <ul className="thumb-list">
                <li>
                <label htmlFor="image1">
                    <img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/unsplash_nature4.jpg" alt=""/>
                    <span className="outer">
                    <span className="inner">
                        <RemoveRedEyeIcon/>
                    </span>
                    </span>
                </label>
                </li>
                <li>
                <label htmlFor="image2">
                    <img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/unsplash_nature11.jpg" alt=""/>
                    <span className="outer">
                    <span className="inner">
                    <RemoveRedEyeIcon/>
                    </span>
                    </span>
                </label>
                </li>
                <li>
                <label htmlFor="image3">
                    <img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/unsplash_nature6.jpg" alt=""/>
                    <span className="outer">
                    <span className="inner">
                    <RemoveRedEyeIcon/>
                    </span>
                    </span>
                </label>
                </li>
                <li>
                <label htmlFor="image4">
                    <img className='img' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/unsplash_nature7.jpg" alt=""/>
                    <span className="outer">
                    <span className="inner">
                    <RemoveRedEyeIcon/>
                    </span>
                    </span>
                </label>
                </li>
            </ul>
            </div>
    </>
  )
}

export default Product_Detail_Carousel