

function Navigation({onSentPage, hasMore, current}) {

  console.log(onSentPage)

  const handlePrevious = () => {
    if (current > 1) {
      let Page = current - 1;
      onSentPage(Page);
    }
};

const handleNext = () => {
    if (hasMore) {
      let Page = current + 1;
      onSentPage(Page);
    }
};

  return (
    <>
    <div className="col-12 pb-1">
                        <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${current === 1 ? 'disabled' : ''}`}>
                              <a className="page-link" onClick={handlePrevious}>Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link">{current}</a></li>
                            <li className={`page-item ${!hasMore ? 'disabled' : ''}`}>
                              <a className="page-link" onClick={handleNext}>Next</a>
                            </li>
                          </ul>
                        </nav>
                    </div>

                    {/* <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${current === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link" onClick={handlePrevious}>Previous</a>
                                        </li>
                                        <li className="page-item"><a className="page-link">{current}</a></li>
                                        <li className={`page-item ${!hasMore ? 'disabled' : ''}`}>
                                            <a className="page-link" onClick={handleNext}>Next</a>
                                        </li>
                                    </ul>
                                </nav> */}
    </>
  )
}

export default Navigation