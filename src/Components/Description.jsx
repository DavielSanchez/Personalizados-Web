import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Description(P) {

    const [data, setData] = useState([])
    const [reviews, setReview] = useState([])
    // const [page, setPage] = useState(1)
    const ID = P.productId
    const url = `http://localhost:3000/products/id/${ID.productId}`
    // const urlReview = `http://localhost:3000/reviews/${ID.productId}?limit=3&page=${page}`
    const urlReview = `http://localhost:3000/reviews/${ID.productId}`


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(url)
            const response_Reviews = await fetch(urlReview)
            const result = await response.json()
            const result_Reviews = await response_Reviews.json()
            if(result != [] && result_Reviews != []){
                setData(result[0])
                setReview(result_Reviews.docs.docs)
            }else{
                console.log(data)
                console.log(reviews)
            }
            console.log(reviews)
        }
        catch (error){
            console.error(error)
            console.error(error)
        }
    }

  return (
    <>
        <div className="row px-xl-5">
        <Tabs
      defaultActiveKey="Descripcion"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab className='show' eventKey="Descripcion" title="Descripcion">
        <div className="tab-pane fade show active" id="tab-pane-1">
            <h4 className="mb-3">Product Description</h4>
            <p>{data.productDescription}</p>
        </div>
      </Tab>
      <Tab eventKey="contact" title="Reviews y Comentarios">
      <div className="row">
                            <div className="col-md-6">
                                <h4 className="mb-4">1 review for `{data.productName}`</h4>
                                {
                                    reviews.map((rev) => (
                                        <div className="media mb-4" key={rev.id}>
                                          <img
                                            src="img/cat-1.jpg"
                                            alt="Image"
                                            className="img-fluid mr-3 mt-1"
                                            style={{ width: '45px' }}
                                          />
                                          <div className="media-body">
                                            <h6>{rev.name}<small> - <i>{rev.reviewDate}</i></small></h6>
                                            <div className="text-primary mb-2">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                            <p>{rev.reviewContent}</p>
                                          </div>
                                        </div>
                                      ))
                                      
                                }
                                        {/* <div className="media mb-4">
                                    <img src="img/cat-1.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{width: '45px'}}/>
                                    <div className="media-body">
                                        <h6>Michaelle Jones<small> - <i>01 Jan 2045</i></small></h6>
                                        <div className="text-primary mb-2">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                        <p>Gg Manito</p>
                                    </div>
                                </div> */}
                                
                            </div>
                            <div className="col-md-6">
                                <h4 className="mb-4">Leave a review</h4>
                                <small>Completa todos los campos marcados con *</small>
                                <div className=" d-flex my-3 align-center">
                                    <p className="mb-0 mr-2">Your Rating * :</p>
                                        <div className="rating text-primary">
                                            {/* <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i> */}
                                            <input value="5" name="rate" id="star5" type="radio"/>
                                            <label title="text" htmlFor="star5"></label>
                                            <input value="4" name="rate" id="star4" type="radio"/>
                                            <label title="text" htmlFor="star4"></label>
                                            <input value="3" name="rate" id="star3" type="radio" checked=""/>
                                            <label title="text" htmlFor="star3"></label>
                                            <input value="2" name="rate" id="star2" type="radio"/>
                                            <label title="text" htmlFor="star2"></label>
                                            <input value="1" name="rate" id="star1" type="radio"/>
                                            <label title="text" htmlFor="star1"></label>
                                        </div>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="message">Your Review *</label>
                                        <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                                    </div>
                                    <div className="form-group mb-0">
                                        <input type="submit" value="Leave Your Review" className="btn btn-primary px-3"/>
                                    </div>
                                </form>
                            </div>
                        </div>
      </Tab>
    </Tabs>
        </div>
    
    </>
  )
}

export default Description
