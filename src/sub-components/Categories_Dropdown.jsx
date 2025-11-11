/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Categories_Dropdown() {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const url = `${import.meta.env.VITE_API_LINK}/categories`;

  useEffect(() => {
    fetchData();
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 992); // lg breakpoint
  };

  const isHome = location.pathname === "/";

  // Si es home + PC mostramos el componente como sidebar estático
  if (isHome && !isMobile) {
    return (
      <div className="col-lg-3 col-sm-6 d-lg-block">
        <div
          className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-primary w-100 border-bottom-0 px-3"
          style={{ height: "65px", marginTop: "-1px", padding: 5 }}
        >
          <h6 style={{color: '#fff'}} className="m-0">Categories</h6>
        </div>
        <nav
            className="navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
            id="navbar-vertical"
          >
            <div
              className="navbar-nav w-100 overflow-auto"
              style={{ maxHeight: "360px" }}
            >
              {data.map((P) => (
                <Link
                  key={P._id}
                  to={`/category/${P.categoryTag}`}
                  className="nav-item nav-link"
                  state={{ Current: P.categoryName, categoryId: P._id }}
                >
                  {P.categoryName}
                </Link>
              ))}
            </div>
          </nav>
      </div>
    );
  }

  // Para móviles o otras rutas usamos dropdown normal
  return (
    <div className="col-lg-3 col-sm-6 d-lg-block">
      <div className="dropdown" style={{ position: "relative", zIndex: 9999 }}>
        <button
          className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-primary w-100 border-bottom-0 px-3"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ height: "65px", marginTop: "-1px", padding: 5 }}
        >
          <h6 style={{color: '#fff'}} className="m-0">Categories</h6>
          <i style={{color: '#fff'}} className="fa fa-angle-down"></i>
        </button>

        <div
          className="dropdown-menu w-100 border-top-0"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 9999,
          }}
        >
          <nav
            className="navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
            id="navbar-vertical"
          >
            <div
              className="navbar-nav w-100 overflow-auto"
              style={{ maxHeight: "360px" }}
            >
              {data.map((P) => (
                <Link
                  key={P._id}
                  to={`/category/${P.categoryTag}`}
                  className="nav-item nav-link"
                  state={{ Current: P.categoryName, categoryId: P._id }}
                >
                  {P.categoryName}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Categories_Dropdown;
