import TopBar from "../Components/TopBar"
import NavBar from "../Components/NavBar"
import FilterList from "../sub-components/FilterList"
import ShopProductsCategory from "../Components/ShopProductsCategory"
import Footer from "../Components/Footer"
import Banner from "../Components/Banner"

import { useLocation } from 'react-router-dom';


function Categories_Shop() {

    const location = useLocation()
    const { Current, categoryId } = location.state

  return (
    <>
    <title>Personalizados Web | Categorias</title>
    <TopBar/>
    <NavBar/>
    <Banner Current={Current} Back="Home" BackHref="/"/>
    <div className="container-fluid pt-5">
        <div className="row px-xl-5">
            <FilterList/>
            <ShopProductsCategory categoryId={categoryId} />
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Categories_Shop