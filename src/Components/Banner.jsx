import { Link } from "react-router-dom"

function Banner(P) {
  return (
    <>
    <div className="container-fluid bg-secondary " id="banner">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: '150px'}}>
            <h1 className="font-weight-semi-bold text-uppercase mb-3">{P.Current}</h1>
            <div className="d-inline-flex">
                <p className="m-0"><Link to={P.BackHref}>{P.Back}</Link></p>
                <p className="m-0 px-2">-</p>
                <p className="m-0">{P.Current}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Banner