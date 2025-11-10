/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import Navigation from "./Navigation"
import Product_Card from "../sub-components/Product_Card"
import Skeleton from '@mui/material/Skeleton';
import SearchProduct from "../sub-components/SearchProduct";

function ShopProducts() {

    const [data, setData] = useState([])
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`${import.meta.env.VITE_API_LINK}/store/products?priceRange=${filter}&limit=${limit}&page=${page}`)
    const baseUrl = `${import.meta.env.VITE_API_LINK}/store/products?priceRange=${filter}`
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
    
        const timeout = setTimeout(() => {
            const newUrl = query.trim()
                ? `${import.meta.env.VITE_API_LINK}/store/products/${query}?priceRange=${filter}&limit=${limit}&page=${page}`
                : `${baseUrl}&limit=${limit}&page=${page}`;
            setUrl(newUrl);
        }, 100);
    
        setDebounceTimeout(timeout);
    
        return () => clearTimeout(timeout);
    }, [query, filter, page]);

    const handleSearchResults = (results) => {
        setQuery(results);
        setPage(1); // Reset to first page when searching
    };

    const handleCheckboxChange = (value) => {
        setFilter(value);
        setPage(1); // Reset to first page when filter changes
    };

    const handlePagination = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.docs) {
                setData(result.docs);
                setHasMoreProducts(result.hasNextPage || false);
            } else {
                setData([]);
                setHasMoreProducts(false);
            }
        } catch (error) {
            setHasMoreProducts(false);
            setData([]);
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Safe data access helper functions
    const getFirstColor = (product) => {
        // Since your API doesn't provide colors, provide a default
        return "Default Color";
    };

    const getFirstSize = (product) => {
        // Since your API doesn't provide sizes, provide a default
        return "Default Size";
    };

    const getMainImage = (product) => {
        return product?.productMainImage || "";
    };

    const getProductName = (product) => {
        return product?.productName || "Unnamed Product";
    };

    const getProductPrice = (product) => {
        return product?.productPrice || 0;
    };

    const getProductOffer = (product) => {
        return product?.productOffer || false;
    };

    const getProductDiscount = (product) => {
        return product?.productDiscount || 0;
    };

    const getIsPriceDisabled = (product) => {
        return product?.isPriceDisabled || false;
    };

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
                    <label className="custom-control-label" htmlFor="price-1">RD$0 - RD$100</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-2" checked={filter === "100-400"} onChange={() => handleCheckboxChange("100-400")}/>
                    <label className="custom-control-label" htmlFor="price-2">RD$100 - RD$400</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-3" checked={filter === "400-600"} onChange={() => handleCheckboxChange("400-600")}/>
                    <label className="custom-control-label" htmlFor="price-3">RD$400 - RD$600</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id="price-4" checked={filter === "600-1000"} onChange={() => handleCheckboxChange("600-1000")}/>
                    <label className="custom-control-label" htmlFor="price-4">RD$600 - RD$1000</label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                    <input type="checkbox" className="custom-control-input" id="price-5" checked={filter === "1000-2000"} onChange={() => handleCheckboxChange("1000-2000")}/>
                    <label className="custom-control-label" htmlFor="price-5">RD$1000 - RD$2000</label>
                </div>
            </form>
        </div>
    </div>
    <div className="col-lg-9 col-md-12">
        <div className="row pb-3">
            <div className="col-12 pb-1">
                <SearchProduct placeholder="Buscar producto" onResults={handleSearchResults}/>
            </div>
            
            {loading ? (
                // Show loading skeletons while fetching data
                Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-12 pb-1">
                        <Skeleton variant="rectangular" width={210} height={118} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </div>
                ))
            ) : data && Array.isArray(data) && data.length > 0 ? (
                data.map((P) => (
                    <Product_Card 
                        key={P._id} 
                        ID={P._id} 
                        Title={getProductName(P)} 
                        Color={getFirstColor(P)} 
                        Image={getMainImage(P)} 
                        Size={getFirstSize(P)} 
                        Quantity={1} 
                        Price={getProductPrice(P)} 
                        Offer={getProductOffer(P)} 
                        Discount={getProductDiscount(P)} 
                        IsPriceDisabled={getIsPriceDisabled(P)}
                    />
                ))
            ) : (
                <div className="col-12 text-center">
                    <p>No hay productos disponibles.</p>
                </div>
            )}
        </div>
    </div>
    <Navigation hasMore={hasMoreProducts} current={page} onSentPage={handlePagination}/>
    </>
  )
}

export default ShopProducts