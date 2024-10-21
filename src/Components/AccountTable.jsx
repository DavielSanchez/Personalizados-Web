import "../../public/css/generalStyles.css"
import BasicTabs from "../sub-components/AccountTabs"

function AccountTable() {
  return (
    <>
    <div className="accountContainer">
        <div className="accountTable">
            <BasicTabs/>
        </div>
    </div>
    </>
  )
}

export default AccountTable