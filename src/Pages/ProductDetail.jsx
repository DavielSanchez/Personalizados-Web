import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Product_Detail_Carousel from "../sub-components/Product_Detail_Carousel";
import Product_Detail_Info from "../sub-components/Product_Detail_Info";
import TopBar from "../Components/TopBar";
import NavBar from "../Components/NavBar";
import Description from "../Components/Description";
import Footer from "../Components/Footer";

function ProductDetail() {
  const location = useLocation();
  const productId = location.state; // Asegúrate de que esto contiene el ID correcto
  
  const [data, setData] = useState([]);
  const url = `http://localhost:3000/products/${productId}`;

  useEffect(() => {
      fetchData();
  }, [productId]); // Añadir productId como dependencia

  const fetchData = async () => {
      try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result); // Guardar el resultado en el estado
          console.log(data); // Mostrar el resultado obtenido
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <>
      <title>Colorful Stylish Shirt</title>
      <TopBar />
      <NavBar />
      <div className="row px-xl-5">
          <Product_Detail_Carousel images={data.productImages} /> {/* Aquí se pasa correctamente la prop */}
          <Product_Detail_Info productId={productId} />
      </div>
      <Description productId={productId} />
      <Footer />
    </>
  );
}

export default ProductDetail;
