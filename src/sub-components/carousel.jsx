import Image1 from '../../public/img/male-worker-using-a-printing-machine-in-a-workshop-picture-id1365037585.jpg'
import Image2 from '../../public/img/carouselImage2.png'

function carousel() {
  return (
    <>
    <div id="header-carousel" className="carousel slide" data-ride="carousel">
                <div id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={Image1} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-flex align-items-center">
                            <div className="container">
                                <h4 className="text-light text-uppercase font-weight-medium mb-3">-10% en tu primera Compra</h4>
                                <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                                <a href="" className="btn btn-primary py-2 px-3 text-white">Shop Now</a>
                            </div>
                        </div>
                        </div>
                        <div className="carousel-item">
                        <img src={Image2} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-flex align-items-center">
                            <div className="container">
                                    <h4 className="text-light text-uppercase font-weight-medium mb-3">-10% en tu primera Compra</h4>
                                    <h3 className="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                                    <a href="" className="btn btn-primary py-2 px-3 text-white">Shop Now</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                </div>
    </>
  )
}

export default carousel