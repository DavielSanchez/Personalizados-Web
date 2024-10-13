import { useState } from "react"
function Shopping_Car_Product() {

    const [quantity, setQuantity] = useState(1)
    const price = 230

  return (
    <>
    <tr>
        <td className="align-middle"><img src="img/product-2.jpg" alt="" style={{width: '50px'}}/> Colorful Stylish Shirt</td>
        <td className="align-middle">${price}</td>
        <td className="align-middle">
            <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary" onClick={() => {
                        if(quantity <= 0){
                            // alert('error')
                        }
                        else{
                        setQuantity(quantity - 1)
                        }}} value={quantity}>
                        <i className="fa fa-minus"></i>
                    </button>
            </div>
            <input type="number" className="form-control form-control-sm bg-secondary text-center" defaultValue='1' onChange={(e) => setQuantity(e.value)} value={quantity} min='1' readOnly/>
            <div className="input-group-btn" onClick={() => {
                setQuantity(quantity + 1)
                }}>
                <button className="btn btn-sm btn-primary" >
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            </div>
        </td>
        <td className="align-middle">${price * quantity}</td>
        <td className="align-middle"><button className="btn btn-sm btn-primary"><i className="fa fa-times"></i></button></td>
    </tr>
    </>
  )
}

export default Shopping_Car_Product