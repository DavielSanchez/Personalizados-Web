import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Skeleton from '@mui/material/Skeleton';

function Categories() {
  const [data, setData] = useState([]);
  const [Productdata, setProductdata] = useState([]);

  const urlCategories = `${import.meta.env.VITE_API_LINK}/categories`;
  const urlProducts = `${import.meta.env.VITE_API_LINK}/products`;

  useEffect(() => {
    fetchDataCategories();
    fetchDataProducts();
  }, []);

  const fetchDataCategories = async () => {
    try {
      const response = await fetch(urlCategories);
      const result = await response.json();
      setData(result);
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataProducts = async () => {
    try {
      const response = await fetch(urlProducts);
      const result = await response.json();
      setProductdata(result);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para contar los productos por categoría
  // const getProductsCountByCategory = (categoryTag) => {
  //   return Object.Productdata.filter((product) => product.productCategory === categoryTag).length;
  // };

  if (data.length === 0) {
    return (
      <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-4 col-md-6 pb-1">
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: '57%' }} />
            </Skeleton>
          </div>
          <div className="col-lg-4 col-md-6 pb-1">
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: '57%' }} />
            </Skeleton>
          </div>
          <div className="col-lg-4 col-md-6 pb-1">
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: '57%' }} />
            </Skeleton>
          </div>
        </div>
      </div>
      
      
    </>
    )
  }

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {data.map((P) => (
            <div className="col-lg-4 col-md-6 pb-1" key={P._id}>
              <div className="cat-item d-flex flex-column border mb-4" style={{ padding: "30px" }}>
                {/* <p className="text-right">
                  ({getProductsCountByCategory(P._id)}) Productos
                </p> */}
                <Link
                  to={{ pathname: `/category/${P.categoryTag}`,hash: '#banner' }}
                  className="cat-img position-relative overflow-hidden mb-3"
                  state={{ Current: P.categoryName, categoryId: P._id }}
                >
                  <img className="img-fluid" src={P.categoryImage} alt="" />
                </Link>
                <h5 className="font-weight-semi-bold m-0">{P.categoryName}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
