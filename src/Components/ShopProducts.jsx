/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import Navigation from "./Navigation"
import Product_Card from "../sub-components/Product_Card"
import Skeleton from '@mui/material/Skeleton';
import SearchProduct from "../sub-components/SearchProduct";

function ShopProducts() {

    const [data, setData] = useState([])
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`${import.meta.env.VITE_API_LINK}/products?priceRange=${filter}&limit=${limit}&page=${page}`)
    const baseUrl = `${import.meta.env.VITE_API_LINK}/products?priceRange=${filter}`
    const [hasMoreProducts, setHasMoreProducts] = useState(true);

    useEffect(() => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
    
        const timeout = setTimeout(() => {
          if (!query.trim()) {
            setUrl(baseUrl);
          } else {
            setUrl(`${import.meta.env.VITE_API_LINK}/products/${query}?priceRange=${filter}`);
          }
        }, 100);
    
        setDebounceTimeout(timeout);
    
        return () => clearTimeout(timeout);
      }, [query, filter, page]);

      const handleSearchResults = (results) => {
        setQuery(results);
      };

      const handleCheckboxChange = (value) => {
        setFilter(value);
      };

      const handlePagination = (results) => {
        setPage(results)
      }

    useEffect(() => {
        fetchData();
    }, [url]);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const result = await response.json()
            setData(result.docs || result)
        }
        catch (error){
            // console.error(error)
        }
    }


  return (
    <>
    <div className="col-lg-3 col-md-12">
        
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
            <form>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="all-1" checked={filter === ""} onChange={() => handleCheckboxChange("")}/>
                    <label className="custom-control-label" htmlFor="all-1">All</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-1" checked={filter === "0-100"} onChange={() => handleCheckboxChange("0-100")}/>
                    <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-2" checked={filter === "100-400"} onChange={() => handleCheckboxChange("100-400")}/>
                    <label className="custom-control-label" htmlFor="price-2">$100 - $400</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-3" checked={filter === "400-600"} onChange={() => handleCheckboxChange("400-600")}/>
                    <label className="custom-control-label" htmlFor="price-3">$400 - $600</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-4" checked={filter === "600-1000"} onChange={() => handleCheckboxChange("600-1000")}/>
                    <label className="custom-control-label" htmlFor="price-4">$600 - $1000</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                    <input type="checkbox" className="custom-control-input" id="price-5" checked={filter === "1000-2000"} onChange={() => handleCheckboxChange("1000-2000")}/>
                    <label className="custom-control-label" htmlFor="price-5">$1000 - $2000</label>
                    {/* <span className="badge font-weight-normal text-black">168</span> */}
                </div>
            </form>
        </div>
        </div>
    <div className="col-lg-9 col-md-12">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                    <SearchProduct placeholder="Buscar producto" onResults={handleSearchResults}/>
                    </div>
                    {data && Array.isArray(data) && data.length > 0 ? (
                        data.map((P) => (
                            <Product_Card 
                                key={P._id} 
                                ID={P._id} 
                                Title={P.productName} 
                                Color={P.productColors[0]} 
                                Image={P.productMainImage} 
                                Size={P.productSizes[0]} 
                                Quantity={1} 
                                Price={P.productPrice} 
                                Offer={P.productOffer} 
                                Discount={P.productDiscount} 
                            />
                        ))
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                    
                </div>
            </div>
                <Navigation hasMore={hasMoreProducts} current={page} onSentPage={handlePagination}/>
    </>
  )
}

export default ShopProducts
