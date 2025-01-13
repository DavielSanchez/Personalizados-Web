/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import Navigation from "./Navigation"
import Product_Card from "../sub-components/Product_Card"
import { Auth } from "../FireBaseConfig/Authentication"
import Skeleton from '@mui/material/Skeleton';


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
            // console.log(result)
            setData(result)
        }
        catch (error){
            // console.error(error)
        }
    }

    if (data.length === 0) {
        return(
            <>
            <div className="col-lg-3 col-md-12">
        
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
            <form>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="all-1"/>
                    <label className="custom-control-label" htmlFor="all-1">All</label>
                    <span className="badge font-weight-normal text-black">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-1"/>
                    <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                    <span className="badge font-weight-normal text-black">150</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-2"/>
                    <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                    <span className="badge font-weight-normal text-black">295</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-3"/>
                    <label className="custom-control-label" htmlFor="price-3">$200 - $300</label>
                    <span className="badge font-weight-normal text-black">246</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-4"/>
                    <label className="custom-control-label" htmlFor="price-4">$300 - $400</label>
                    <span className="badge font-weight-normal text-black">145</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                    <input type="checkbox" className="custom-control-input" id="price-5"/>
                    <label className="custom-control-label" htmlFor="price-5">$400 - $500</label>
                    <span className="badge font-weight-normal text-black">168</span>
                </div>
            </form>
        </div>
        </div>
            <div className="col-lg-9 col-md-12">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-start mb-4">
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
                    

                    <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                    <Skeleton variant="rectangular" width="100%" height={300} />
                    <Skeleton variant="rectangular" width="100%" style={{ marginTop: 5 }}>
                        {/* <div style={{ paddingTop: '57%' }} /> */}
                    </Skeleton>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                    <Skeleton variant="rectangular" width="100%" height={300} />
                    <Skeleton variant="rectangular" width="100%" style={{ marginTop: 5 }}>
                        {/* <div style={{ paddingTop: '57%' }} /> */}
                    </Skeleton>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                    <Skeleton variant="rectangular" width="100%" height={300} />
                    <Skeleton variant="rectangular" width="100%" style={{ marginTop: 5 }}>
                        {/* <div style={{ paddingTop: '57%' }} /> */}
                    </Skeleton>
                    </div>
                    


                    
                </div>
            </div>
            </>
        )
    }

  return (
    <>
    <div className="col-lg-3 col-md-12">
        
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
            <form>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="all-1"/>
                    <label className="custom-control-label" htmlFor="all-1">All</label>
                    <span className="badge font-weight-normal text-black">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-1"/>
                    <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                    <span className="badge font-weight-normal text-black">150</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-2"/>
                    <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                    <span className="badge font-weight-normal text-black">295</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-3"/>
                    <label className="custom-control-label" htmlFor="price-3">$200 - $300</label>
                    <span className="badge font-weight-normal text-black">246</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-4"/>
                    <label className="custom-control-label" htmlFor="price-4">$300 - $400</label>
                    <span className="badge font-weight-normal text-black">145</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                    <input type="checkbox" className="custom-control-input" id="price-5"/>
                    <label className="custom-control-label" htmlFor="price-5">$400 - $500</label>
                    <span className="badge font-weight-normal text-black">168</span>
                </div>
            </form>
        </div>
        </div>
    <div className="col-lg-9 col-md-12">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-start mb-4">
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
                    <Product_Card key={P._id} ID={P._id} Title={P.productName} Color={P.productColors[0]} Image={P.productMainImage} Size={P.productSizes[0]} Quantity={1} Price={P.productPrice} Offer={P.productOffer} Discount={P.productDiscount} />
                        ))}
                    
                </div>
            </div>
                <Navigation/>
    </>
  )
}

export default ShopProductsCategory
