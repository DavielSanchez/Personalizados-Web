import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Shop from "./Pages/Shop"
import ShoppingCar from "./Pages/ShoppingCar"
import ProductDetail from "./Pages/ProductDetail"
import Categories_Shop from "./Pages/Categories_Shop"
import SignIn from "./Pages/Register"
import SignUp from "./Pages/LogIn"
import Account from "./Pages/Account"
// import { UserProvider } from "./sub-components/UserContext"
// import PruebaApi from "./Pages/PruebaApi"
ProductDetail
function App() {

  return (
    <>
    {/* <UserProvider> */}
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/shoppingcar" element={<ShoppingCar/>}/>
          <Route path="/product" element={<ProductDetail/>}/>
          <Route path="/category/:category" element={<Categories_Shop/>}/>
          {/* <Route path="/try" element={<PruebaApi/>}/> */}

          <Route path="/register" element={<SignIn/>}/>
          <Route path="/login" element={<SignUp/>}/>
          <Route path="/account" element={<Account/>}/>

        </Routes>
      </BrowserRouter>
      {/* </UserProvider> */}
    </>
  )
}

export default App
