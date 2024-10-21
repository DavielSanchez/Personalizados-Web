/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

function Categories_Dropdown() {

  const [data, setData] = useState([])
    const url = `http://localhost:3000/categories`

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const result = await response.json()
            setData(result)
            console.log(data)
        }
        catch (error){
            console.error(error)
        }
    }

  return (
    <>
    <div className="col-lg-3 d-none d-lg-block">
            <div className="dropdown">
                <Link className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-primary w-100 border-bottom-0 px-3" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ height: '65px', marginTop : '-1px', padding: 5 }}>
                    <h6 className="m-0">Categories</h6>
                    <i className="fa fa-angle-down text-dark"></i>
                </Link>

                <ul className="dropdown-menu w-100 border-top-0">
                <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                    <div className="navbar-nav w-100 overflow-hidden" style={{height: '360px'}}>
                      {data.map((P) => (
                        <Link key={P._id} to={{pathname: `/category/${P.categoryTag}`}} className="nav-item nav-link"
                        state={{ Current: P.categoryName, categoryId: P._id }}> {P.categoryName} </Link>
                      ))}
                    </div>
                </nav>
                </ul>
            </div>
            </div>
    </>
  )
}

export default Categories_Dropdown


{/* <Link to={{pathname: "/category/camisetas"}} className="nav-item nav-link"
state={{ Current: "Camisetas", }}>Camisetas</Link>
<Link to="/category/hoddies" className="nav-item nav-link"
state={{Current: 'Hoddies'}}>Hoddies</Link>
<Link to="/category/tazas" className="nav-item nav-link"
state={{Current: 'Tazas'}}>Tazas</Link>
<Link to="/category/vasos" className="nav-item nav-link"
state={{Current: 'Vasos'}}>Vasos</Link>
<Link to="/category/termos" className="nav-item nav-link"
state={{Current: 'Termos'}}>Termos</Link>
<Link to="/category/textiles" className="nav-item nav-link"
state={{Current: 'Textiles'}}>Textiles</Link>
<Link to="/category/llaveros" className="nav-item nav-link"
state={{Current: 'Llaveros'}}>Llaveros</Link>
<Link to="/category/mousepads" className="nav-item nav-link"
state={{Current: 'Mouse Pads'}}>Mouse Pads</Link>
<Link to="/category/extras" className="nav-item nav-link"
state={{Current: 'Extras'}}>Extras</Link> */}