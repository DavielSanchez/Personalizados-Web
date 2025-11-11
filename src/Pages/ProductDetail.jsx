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
  const {productId, userId} = location.state;
  
  const [data, setData] = useState([]);
  const url = `${import.meta.env.VITE_API_LINK}/store/products/id/${productId}`;
  // console.log(productId)

  useEffect(() => {
      fetchData();
  }, [productId]);

  useEffect(() => {
    if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}, [location.hash]);

  const fetchData = async () => {
      try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result); // Guardar el resultado en el estado
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <>
      <title>{data.productName}</title>
      <TopBar />
      <NavBar />
      <div className="row px-xl-5" id="productcarousel">
          <Product_Detail_Carousel images={data.productImages} />
          <Product_Detail_Info productId={productId} userId={userId} />
      </div>
      <Description productId={productId} />
      <Footer />
    </>
  );
}

export default ProductDetail;
