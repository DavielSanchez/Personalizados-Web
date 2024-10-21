import TopBar from "../Components/TopBar"
import Footer from "../Components/Footer"
import AccountTable from "../Components/AccountTable"
import { Auth } from "../FireBaseConfig/Authentication"
function Account() {
    Auth()
  return (
    <>
    <title>Personalizados Web</title>
    <TopBar/>
    <AccountTable/>
    <Footer/>
    </>
  )
}

export default Account