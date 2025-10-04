

function social_networks() {
  return (
        <div className="row bg-secondary py-2 px-xl-5" id="top">
            <div className="col-lg-4 d-none d-lg-block">
                <div className="d-inline-flex align-items-center">
                    <a className="text-dark" href="">FAQs</a>
                    <span className="text-muted px-2">|</span>
                    <a className="text-dark" href="">Help</a>
                    <span className="text-muted px-2">|</span>
                    <a className="text-dark" href="">Support</a>
                </div>
            </div>
            <div className="col-lg-4 text-center">
                <a className="text-dark px-2" href="">
                    <img src="/img/en-todo-el-mundo.png" alt="" width={'20px'}/>
                </a>
                <a href="/"><span className="text-primary">Personalizados RD</span></a>
                <a className="text-dark px-2" href="">
                    <img src="/img/bandera.png" alt="" width={'20px'}/>
                </a>
            </div>
            <div className="col-lg-4 text-center text-lg-right">
                <div className="d-inline-flex align-items-center">
                    {/* <a className="text-dark px-2" href="">
                        <i className="fab fa-facebook-f"></i>
                    </a> */}
                    {/* <a className="text-dark px-2" href="">
                        <i className="fab fa-twitter"></i>
                    </a> */}
                    {/* <a className="text-dark px-2" href="">
                        <i className="fab fa-linkedin-in"></i>
                    </a> */}
                    <a className="text-dark px-2" target="blank" href="https://www.instagram.com/_personalizados_rd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                        <i className="fab fa-instagram"></i>
                    </a>
                    {/* <a className="text-dark pl-2" href="">
                        <i className="fab fa-youtube"></i>
                    </a> */}
                </div>
            </div>
        </div>
  )
}

export default social_networks
