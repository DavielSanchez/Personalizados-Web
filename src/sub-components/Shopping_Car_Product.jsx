import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from "react-router-dom";


function Shopping_Car_Product({ product, userId, onProductRemove }) {

    const MySwal = withReactContent(Swal)

    const [data, setData] = useState([])
    const [quantity, setQuantity] = useState(product.productQuantity || 1);
    const [price, setPrice] = useState(product.productPrice);


  useEffect(() => {
    fetchProducto();
}, []);

  const decreaseQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      if (userId != null) {
        const dataProduct = {
          userId: userId,
          productId: product.productId,
          productQuantity: newQuantity,
        };

        try {
          const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/quantity/moreorless`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataProduct),
          });

          const responseData = await response.json();
          onProductRemove();
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };

  const increaseQuantity = async () => {
    if (quantity > 0) {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
  
        if (userId != null) {
          const dataProduct = {
            userId: userId,
            productId: product.productId,
            productQuantity: newQuantity,
          };
  
          try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/quantity/moreorless`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataProduct),
            });
  
            const responseData = await response.json();
            onProductRemove();
          } catch (error) {
            console.error('Error:', error);
          }
        }
      }
  };

  const removeProductFromCart = async () => {
    const result = await MySwal.fire({
      title: "¿Estás seguro que quieres eliminar este artículo del carrito?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#02ba2a",
      denyButtonText: "Cancelar"
    });
  
    if (result.isConfirmed) {
      MySwal.fire("Artículo eliminado", "", "success");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/cart/remove-product`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            productId: product._id,
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          onProductRemove();
        } else {
          MySwal.fire("Error", "No se pudo eliminar el producto", "error");
        }
      } catch (error) {
        console.error(error);
        MySwal.fire("Error", "Hubo un problema al eliminar el producto", "error");
      }
    } else if (result.isDenied) {
      MySwal.fire("Operación cancelada", "", "error");
    }
  };

  const fetchProducto = async () => {
    const urlProduct = `${import.meta.env.VITE_API_LINK}/products/id/${product.productId}`
        try{
            const response = await fetch(urlProduct)
            const result = await response.json()
            if(result != []){
                setData(result[0])
            }else{
                // console.log(data)
            }
        }
        catch (error){
            console.error(error)
        }
  }

  useEffect(() => {
    if (data.productOffer === true) {
      setPrice(data.productDiscount);
    } else {
      setPrice(product.productPrice); // Asegura que `price` esté sincronizado.
    }
  }, [data, product.productPrice]);

  if (data.productOffer === true) {

        return (
            <tr>
              <td className="align-middle">
                <Link to="/product" className="btn btn-sm text-dark p-0" 
                    state={{ productId: product.productId, userId: userId }}
                    >
                    <img
                  src={product.productImage || "img/default-product.jpg"}
                  alt={product.productName}
                  style={{ width: "50px" }}
                />{" "}
                {product.productName}
                </Link>
              </td>
              <td className="align-middle">${price}</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
                  <div className="input-group-btn">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={decreaseQuantity}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="number"
                    className="form-control form-control-sm bg-secondary text-center"
                    value={quantity}
                    readOnly
                  />
                  <div className="input-group-btn">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={increaseQuantity}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">${price * quantity}</td>
              <td className="align-middle">
                <button className="btn btn-sm btn-primary" onClick={removeProductFromCart}>
                  <i className="fa fa-times"></i>
                </button>
              </td>
            </tr>
          )
  }

  return (
    <tr>
      <td className="align-middle">
        <Link to="/product" className="btn btn-sm text-dark p-0" 
            state={{ productId: product.productId, userId: userId }}
            >
            <img
          src={product.productImage || "img/default-product.jpg"}
          alt={product.productName}
          style={{ width: "50px" }}
        />{" "}
        {product.productName}
        </Link>
      </td>
      <td className="align-middle">${price}</td>
      <td className="align-middle">
        <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary"
              onClick={decreaseQuantity}
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <input
            type="number"
            className="form-control form-control-sm bg-secondary text-center"
            value={quantity}
            readOnly
          />
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary"
              onClick={increaseQuantity}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </td>
      <td className="align-middle">${price * quantity}</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-primary" onClick={removeProductFromCart}>
          <i className="fa fa-times"></i>
        </button>
      </td>
    </tr>
  );
}

export default Shopping_Car_Product;
