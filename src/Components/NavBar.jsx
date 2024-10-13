import { Link } from 'react-router-dom'
import Categories_Dropdown from '../sub-components/Categories_Dropdown'

function NavBar() {

    

  return (
    <>
    <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
        <Categories_Dropdown/>
            <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                    <a href="" className="text-decoration-none d-block d-lg-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">
                            {/* <img src="../../public/img/Logo.png" alt="" /> */}P
                        </span>Shopper</h1>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                            <Link to="/" className="nav-item nav-link ">Inicio</Link>
                            <Link to="/shop" className="nav-item nav-link">Tienda</Link>
                            <a href="contact.html" className="nav-item nav-link">Contacto</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </>
  )
}

export default NavBar