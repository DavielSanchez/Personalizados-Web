import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import User from './User';

function Search() {
  return (
    <>
    <div className="row align-items-center py-3 px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <a href="/" className="text-decoration-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">
                        {/* <img src="../../public/img/Logo.png" className='image-fluid' alt="" width={'50px'}/> */}
                        P
                    </span>Shop</h1>
                </a>
            </div>
            <div className="col-lg-6 col-6 text-left">
                <form action="">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for products"/>
                        <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-lg-3 col-6 text-right">
                <a href="/shoppingcar" className="btn">
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartIcon className='text-primary'/>
                    </Badge>
                </a>
                <a className="btn">
                <User/>
                </a>
            </div>
        </div>
    </>
  )
}

export default Search