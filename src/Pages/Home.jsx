import TopBar from "../Components/TopBar"
import NavBarHome from "../Components/NavBarHome"
import Features from "../Components/Features"
import Categories from "../Components/Categories"
import Offers from "../Components/Offers"
import TrendingProducts from "../Components/TrendingProducts"
import Suscribe from "../Components/Suscribe"
import Proveedores from "../Components/Proveedores"
import Footer from "../Components/Footer"
function Home() {
  return (
    <>
    <title>Personalizados Web</title>
    <TopBar/>
    <NavBarHome/>
    <Features/>
    <Categories/>
    <Offers/>
    <TrendingProducts/>
    <Suscribe/>
    <Proveedores/>
    <Footer/>
    </>
  )
}

export default Home