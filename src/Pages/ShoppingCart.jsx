import TopBar from "../Components/TopBar"
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"
import Shopping_Car_Product from "../sub-components/Shopping_Car_Product"
import Cart_Summary from "../sub-components/Cart_Summary"
import Banner from "../Components/Banner"

function ShoppingCar() {
  return (
    <>
    <title>Personalizados Web | Shopping Cart</title>
    <TopBar/>
    <NavBar/>
    <Banner Current="Shopping Cart" Back="Shop" BackHref="/shop"/>

    <div className="container-fluid pt-5">
        <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-bordered text-center mb-0">
                    <thead className="bg-secondary text-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        <Shopping_Car_Product/>
                        
                    </tbody>
                </table>
            </div>
            <Cart_Summary/>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default ShoppingCar