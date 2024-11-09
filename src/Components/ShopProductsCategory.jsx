/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import Navigation from "./Navigation"
import Product_Card from "../sub-components/Product_Card"
import { Auth } from "../FireBaseConfig/Authentication"

function ShopProductsCategory(P) {

    Auth()

    const [data, setData] = useState([])
    const url = `${import.meta.env.VITE_API_LINK}/products/category/${P.categoryId}`
    

    useEffect(() => {
        fetchData();
    }, [P.categoryId]);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const result = await response.json()
            console.log(result)
            setData(result)
        }
        catch (error){
            console.error(error)
        }
    }

  return (
    <>
    <div className="col-lg-9 col-md-12">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-start mb-4">
                        <div className="dropdown">
                            <button className="btn border dropdown-toggle me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort by
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Latest</a></li>
                                <li><a className="dropdown-item" href="#">Popularity</a></li>
                                <li><a className="dropdown-item" href="#">Best Rating</a></li>
                            </ul>
                        </div>
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search by name"/>
                                    <div className="input-group-append border-left-2">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {data.map((P) => (
                    <Product_Card Title={P.productName} Price={P.productPrice} ID={P._id} key={P._id} Image={P.productMainImage}/>
                        ))
                    }
                </div>
            </div>
                <Navigation/>
    </>
  )
}

export default ShopProductsCategory
