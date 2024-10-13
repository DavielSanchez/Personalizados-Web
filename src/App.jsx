import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Shop from "./Pages/Shop"
import ShoppingCar from "./Pages/ShoppingCar"
import ProductDetail from "./Pages/ProductDetail"
import Categories_Shop from "./Pages/Categories_Shop"
// import PruebaApi from "./Pages/PruebaApi"
ProductDetail
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/shoppingcar" element={<ShoppingCar/>}/>
          <Route path="/product" element={<ProductDetail/>}/>
          <Route path="/category/:category" element={<Categories_Shop/>}/>
          {/* <Route path="/try" element={<PruebaApi/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
