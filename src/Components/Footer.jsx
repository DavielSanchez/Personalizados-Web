import Suscribe from "./Suscribe"

function Footer() {
  return (
    <>
    <div className="container-fluid bg-secondary text-dark mt-5 pt-5" id="footer">
        <div className="row px-xl-5 pt-5">
            <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                <a href="" className="text-decoration-none">
                    <h1 className="mb-4 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border border-white px-3 mr-1">P</span>Shop</h1>
                </a>
                <p>Descubre una amplia gama de productos personalizables que te permitirán expresar tu estilo y personalidad en cada detalle.</p>
                <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
                <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>personalizalor@gmail.com</p>
                <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+1 809-715-1515</p>
            </div>
            <div className="col-lg-8 col-md-12">
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-dark" href="/"><i className="fa fa-angle-right mr-2"></i>Inicio</a>
                            <a className="text-dark" href="/shop"><i className="fa fa-angle-right mr-2"></i>Tienda</a>
                            <a className="text-dark" href="contact.html"><i className="fa fa-angle-right mr-2"></i>Contactanos</a>
                        </div>
                    </div>
                    <Suscribe/>
                </div>
            </div>
        </div>
        <div className="row border-top border-light mx-xl-5 py-4">
            <div className="col-md-6 px-xl-0">
                <p className="mb-md-0 text-center text-md-left text-dark">
                    &copy; <a className="text-dark font-weight-semi-bold" href="https://www.instagram.com/_personalizados_rd">Personalizados RD</a>. All Rights Reserved. Designed
                    by
                    <a className="text-dark font-weight-semi-bold" href="https://github.com/DavielSanchez"> Daviel Sanchez</a><br/>
                </p>
            </div>
            <div className="col-md-6 px-xl-0 text-center text-md-right">
                <img className="img-fluid" src="../../public/img/payments.png" alt=""/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer