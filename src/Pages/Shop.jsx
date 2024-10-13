import TopBar from "../Components/TopBar"
import NavBar from "../Components/NavBar"
import FilterList from "../sub-components/FilterList"
import ShopProducts from "../Components/ShopProducts"
import Footer from "../Components/Footer"
import Banner from "../Components/Banner"

function Shop() {
  return (
    <>
    <title>Personalizados Web | Shop</title>
    <TopBar/>
    <NavBar/>
    <Banner Current="Nuestra Tienda" Back="Home" BackHref="/"/>
    <div className="container-fluid pt-5">
        <div className="row px-xl-5">
            <FilterList/>
            <ShopProducts/>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Shop