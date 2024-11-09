import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function Product_Detail_Info() {

    const location = useLocation()
    const { productId } = location.state

    const [data, setData] = useState([])
    const url = `${import.meta.env.VITE_API_LINK}/products/id/${productId}`

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const result = await response.json()
            if(result != []){
                setData(result[0])
                setColors(result[0].productColors)
                
            }else{
                // console.log(data)
            }
        }
        catch (error){
            console.error(error)
        }
    }

    const [quantity, setQuantity] = useState(1)
    const [colors, setColors] = useState([])

  return (
    <>
    <div className="col-lg-7 pb-5">
                <h3 className="font-weight-semi-bold">{data.productName}</h3>
                <div className="d-flex mb-3">
                    <div className="text-primary mr-2">
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star-half-alt"></small>
                        <small className="far fa-star"></small>
                    </div>
                    
                    <small className="pt-1">(50 Reviews)</small>
                </div>
                <h3 className="font-weight-semi-bold mb-4">${data.productPrice}</h3>
                <p className="mb-4">{data.productSummary}</p>
                <div className="d-flex mb-4">
                    <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                    <form>
                        {colors.map((color, index) => (
                            <div key={index} className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" id={`color-${index}`} name="color"/>
                                <label className="custom-control-label" htmlFor={`color-${index}`}>{color}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="d-flex align-items-center mb-4 pt-2">
                    <div className="input-group quantity mr-3" style={{width: '130px'}}>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-minus" onClick={() => {
                        if(quantity <= 1){
                            // alert('error')
                        }
                        else{
                        setQuantity(quantity - 1)
                        }}} value={quantity}>
                            <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control bg-secondary text-center" value={quantity}/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus" onClick={() => {
                setQuantity(quantity + 1)
                }}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                </div>
                <div className="d-flex pt-2">
                    <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                    <div className="d-inline-flex">
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Product_Detail_Info