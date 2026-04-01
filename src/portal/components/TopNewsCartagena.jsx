const carasolePic = "/assets/carasole.png";

export default function TopNewsCartagena() {
  return (
    <section className="d-none d-md-block py-5">
            <h2 className="text-3xl md:text-4xl font-black text-black text-center uppercase mb-16">
              TOP NEWS OF CARTAGENA
            </h2>
            <div className="container">
              <div className="row align-items-center">
          
                <div className="col-lg-8 col-md-7">
                  <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
          
                    <div className="carousel-inner rounded overflow-hidden">
                      <div className="carousel-item active">
                        <img src={carasolePic} className="d-block w-100" alt="Slide 1" />
                      </div>
                      <div className="carousel-item">
                        <img src={carasolePic} className="d-block w-100" alt="Slide 2" />
                      </div>
                      <div className="carousel-item">
                        <img src={carasolePic} className="d-block w-100" alt="Slide 3" />
                      </div>
                    </div>
          
                    <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                    </button>
          
                    <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                    </button>
          
                  </div>
                </div>
          
                {/* Content */}
                <div className="col-lg-4 col-md-5 mt-4 mt-md-0">
                  <div className='d-flex my-5 align-items-center'>
                   <div>
                     <span>Accomodation - Hotels</span>
                    <h5 className="fw-bold my-2 text-lg text-black">The Most Luxurious Hotel Of Cartagena</h5>
                    <span>3 Min Read</span>
                   </div>
                   <div>
                    <button className='btn fs-2 fw-bold'><i className="bi bi-arrow-right-circle text-[#d0a439] hover:text-[#b88f30]"></i></button>
                   </div>
                  </div>
                   <div className='d-flex my-5 align-items-center'>
                   <div>
                     <span>Accomodation - Hotels</span>
                    <h5 className="fw-bold my-2 text-lg text-black">Want To Exercise? The
Best Spots For All Types
Of Workouts</h5>
                    <span>3 Min Read</span>
                   </div>
                   <div>
                    <button className='btn fs-2 fw-bold'><i className="bi bi-arrow-right-circle text-[#d0a439] hover:text-[#b88f30]"></i></button>
                   </div>
                  </div>
          
                   <div className='d-flex my-5 align-items-center'>
                   <div>
                     <span>Accomodation - Hotels</span>
                    <h5 className="fw-bold my-2 text-lg text-black">The Top 7
Instagrammable Places Of
Cartagena</h5>
                    <span>3 Min Read</span>
                   </div>
                   <div>
                    <button className='btn fs-2 fw-bold'><i className="text-[#d0a439] hover:text-[#b88f30] bi bi-arrow-right-circle"></i></button>
                   </div>
                  </div>
                </div>
          
              </div>
            </div>
          </section> 
  )
}
