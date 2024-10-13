import Social from "../sub-components/social_networks"
import Search from "../sub-components/Search"
function TopBar() {
  return (
    <>
      <div className="container-fluid">
        <Social/>
        <Search/>
      </div>
    </>
  )
}

export default TopBar