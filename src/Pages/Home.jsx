import TopBar from "../Components/TopBar"
import NavBarHome from "../Components/NavBarHome"
import Features from "../Components/Features"
import Categories from "../Components/Categories"
import Offers from "../Components/Offers"
import OfferProducts from "../Components/OfferProducts"
import Proveedores from "../Components/Proveedores"
import Footer from "../Components/Footer"
import AlertDisclaimer from "../sub-components/AlertDisclaimer"
function Home() {
  return (
    <>
    <title>Personalizados Web</title>
    <TopBar/>
    <AlertDisclaimer/>
    <NavBarHome/>
    <Features/>
    <Categories/>
    <Offers/>
    <OfferProducts/>
    <Proveedores/>
    <Footer/>
    </>
  )
}

export default Home