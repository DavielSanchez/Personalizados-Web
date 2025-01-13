import { useState } from "react";

function SearchProduct({onResults, placeholder}) {

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const searchText = e.target.value;
    onResults(searchText)
  };

  return (
    <>
<div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-start mb-4">
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder={placeholder} onChange={handleSearch}/>
                                    <div className="input-group-append border-left-2">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
    </>
  )
}

export default SearchProduct