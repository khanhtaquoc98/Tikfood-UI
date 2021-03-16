import React from "react";
import Slick from "react-slick";


export default class RestaurantItem extends React.Component{

    render(){
       const ArrowLeft = ({ currentSlide, slideCount, ...props }) => (
            <div {...props} 
            className={ "slick-prev slick-arrow" +
                (currentSlide === 0 ? " slick-disabled" : "")}
              aria-hidden="true"
              aria-disabled={currentSlide === 0 ? true : false}
              ><i className="fas fa-chevron-left "></i></div>
        );
        const ArrowRight = ({ currentSlide, slideCount, ...props }) => (
            <div {...props}
            className={
              "slick-next slick-arrow" +
              (currentSlide  == slideCount - 4 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide  === slideCount - 4 ? true : false}
              ><i className="fas fa-chevron-right "></i></div>
        );

        const setting = {
            className: "arrow-center full-slide custom-nav equal-height",
            slidesToShow: 5,
            autoplay: false,
            dots: false,
            arrow: true,
            nextArrow:  <ArrowRight/>,//(<div className="slick-arrow slick-next"><i className="fas fa-chevron-right "></i></div>),
            prevArrow:  <ArrowLeft/>,//(<div className="slick-arrow slick-prev"><i className="fas fa-chevron-left "></i></div>),
            responsive: [
                {
                    breakpoint: 2000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 770,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        }

        return(
            <Slick {...setting}>
                        <div>
                        <div className="box" data-animate="fadeInUp" style={{width: '100%', display: 'inline-block'}}>
                        <div className="store card border-0 rounded-0">
                          <div className="position-relative store-image">
                            <a href="listing-details-full-gallery.html" tabIndex={0}>
                              <img src="images/shop/shop-1.jpg" alt="store 1" className="card-img-top rounded-0" />
                            </a>
                            <div className="image-content position-absolute d-flex align-items-center">
                              <div className="content-left">
                                <div className="badge badge-primary">Featured</div>
                              </div>
                              <div className="content-right ml-auto d-flex w-lg show-link">
                                <a href="images/shop/full-shop-1.jpg" className="item viewing" data-toggle="tooltip" data-placement="top"  data-gtf-mfp="true" tabIndex={0} data-original-title="Quickview">
                                  <svg className="icon icon-expand">
                                    <use xlinkHref="#icon-expand" />
                                  </svg>
                                </a>
                                <a href="#" className="item marking" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Bookmark">
                                  <i className="fal fa-bookmark" /></a>
                                <a href="#" className="item" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Compare">
                                  <svg className="icon icon-chart-bars">
                                    <use xlinkHref="#icon-chart-bars" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body px-0 pb-0 pt-3">
                            <a href="listing-details-full-gallery.html" className="card-title h5 text-dark d-inline-block mb-2" tabIndex={0}><span className="letter-spacing-25">Roman
                                Kraft Hotel</span></a>
                            <ul className="list-inline store-meta mb-4 font-size-sm d-flex align-items-center flex-wrap">
                              <li className="list-inline-item"><span className="badge badge-success d-inline-block mr-1">5.0</span><span>4 rating</span>
                              </li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item"><span className="mr-1">From</span><span className="text-danger font-weight-semibold">$56.00</span></li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item">
                                <a href="#" className="link-hover-secondary-primary" tabIndex={0}>
                                  <svg className="icon icon-bed">
                                    <use xlinkHref="#icon-bed" />
                                  </svg>
                                  <span>Hotel</span>
                                </a>
                              </li>
                            </ul>
                            <div className="media">
                              <a href="#" className="d-inline-block mr-3" tabIndex={0}><img src="./images/listing/testimonial-1.png" alt="testimonial" className="rounded-circle" />
                              </a>
                              <div className="media-body lh-14 font-size-sm">Overlooking Bloomsbury's
                                Russell Square
                                and
                                a 2 minutes' walk from the tube station of the same name...
                              </div>
                            </div>
                          </div>
                          <ul className="list-inline card-footer rounded-0 border-top pt-3 mt-5 bg-transparent px-0 store-meta d-flex align-items-center">
                            <li className="list-inline-item">
                              <span className="d-inline-block mr-1">
                                <i className="fal fa-map-marker-alt">
                                </i>
                              </span>
                              <a href="#" className="text-secondary text-decoration-none link-hover-secondary-blue" tabIndex={0}>
                                San Francisco, CA</a>
                            </li>
                            <li className="list-inline-item separate" />
                            <li className="list-inline-item">
                              <span className="text-green">Open now!</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      </div>
                      <div>
                                <div className="box" data-animate="fadeInUp" style={{width: '100%', display: 'inline-block'}}>
                        <div className="store card border-0 rounded-0">
                          <div className="position-relative store-image">
                            <a href="listing-details-full-gallery.html" tabIndex={0}>
                              <img src="images/shop/shop-1.jpg" alt="store 1" className="card-img-top rounded-0" />
                            </a>
                            <div className="image-content position-absolute d-flex align-items-center">
                              <div className="content-left">
                                <div className="badge badge-primary">Featured</div>
                              </div>
                              <div className="content-right ml-auto d-flex w-lg show-link">
                                <a href="images/shop/full-shop-1.jpg" className="item viewing" data-toggle="tooltip" data-placement="top"  data-gtf-mfp="true" tabIndex={0} data-original-title="Quickview">
                                  <svg className="icon icon-expand">
                                    <use xlinkHref="#icon-expand" />
                                  </svg>
                                </a>
                                <a href="#" className="item marking" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Bookmark">
                                  <i className="fal fa-bookmark" /></a>
                                <a href="#" className="item" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Compare">
                                  <svg className="icon icon-chart-bars">
                                    <use xlinkHref="#icon-chart-bars" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body px-0 pb-0 pt-3">
                            <a href="listing-details-full-gallery.html" className="card-title h5 text-dark d-inline-block mb-2" tabIndex={0}><span className="letter-spacing-25">Roman
                                Kraft Hotel</span></a>
                            <ul className="list-inline store-meta mb-4 font-size-sm d-flex align-items-center flex-wrap">
                              <li className="list-inline-item"><span className="badge badge-success d-inline-block mr-1">5.0</span><span>4 rating</span>
                              </li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item"><span className="mr-1">From</span><span className="text-danger font-weight-semibold">$56.00</span></li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item">
                                <a href="#" className="link-hover-secondary-primary" tabIndex={0}>
                                  <svg className="icon icon-bed">
                                    <use xlinkHref="#icon-bed" />
                                  </svg>
                                  <span>Hotel</span>
                                </a>
                              </li>
                            </ul>
                            <div className="media">
                              <a href="#" className="d-inline-block mr-3" tabIndex={0}><img src="./images/listing/testimonial-1.png" alt="testimonial" className="rounded-circle" />
                              </a>
                              <div className="media-body lh-14 font-size-sm">Overlooking Bloomsbury's
                                Russell Square
                                and
                                a 2 minutes' walk from the tube station of the same name...
                              </div>
                            </div>
                          </div>
                          <ul className="list-inline card-footer rounded-0 border-top pt-3 mt-5 bg-transparent px-0 store-meta d-flex align-items-center">
                            <li className="list-inline-item">
                              <span className="d-inline-block mr-1">
                                <i className="fal fa-map-marker-alt">
                                </i>
                              </span>
                              <a href="#" className="text-secondary text-decoration-none link-hover-secondary-blue" tabIndex={0}>
                                San Francisco, CA</a>
                            </li>
                            <li className="list-inline-item separate" />
                            <li className="list-inline-item">
                              <span className="text-green">Open now!</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      </div>
                      <div>
                                <div className="box" data-animate="fadeInUp" style={{width: '100%', display: 'inline-block'}}>
                        <div className="store card border-0 rounded-0">
                          <div className="position-relative store-image">
                            <a href="listing-details-full-gallery.html" tabIndex={0}>
                              <img src="images/shop/shop-1.jpg" alt="store 1" className="card-img-top rounded-0" />
                            </a>
                            <div className="image-content position-absolute d-flex align-items-center">
                              <div className="content-left">
                                <div className="badge badge-primary">Featured</div>
                              </div>
                              <div className="content-right ml-auto d-flex w-lg show-link">
                                <a href="images/shop/full-shop-1.jpg" className="item viewing" data-toggle="tooltip" data-placement="top"  data-gtf-mfp="true" tabIndex={0} data-original-title="Quickview">
                                  <svg className="icon icon-expand">
                                    <use xlinkHref="#icon-expand" />
                                  </svg>
                                </a>
                                <a href="#" className="item marking" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Bookmark">
                                  <i className="fal fa-bookmark" /></a>
                                <a href="#" className="item" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Compare">
                                  <svg className="icon icon-chart-bars">
                                    <use xlinkHref="#icon-chart-bars" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body px-0 pb-0 pt-3">
                            <a href="listing-details-full-gallery.html" className="card-title h5 text-dark d-inline-block mb-2" tabIndex={0}><span className="letter-spacing-25">Roman
                                Kraft Hotel</span></a>
                            <ul className="list-inline store-meta mb-4 font-size-sm d-flex align-items-center flex-wrap">
                              <li className="list-inline-item"><span className="badge badge-success d-inline-block mr-1">5.0</span><span>4 rating</span>
                              </li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item"><span className="mr-1">From</span><span className="text-danger font-weight-semibold">$56.00</span></li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item">
                                <a href="#" className="link-hover-secondary-primary" tabIndex={0}>
                                  <svg className="icon icon-bed">
                                    <use xlinkHref="#icon-bed" />
                                  </svg>
                                  <span>Hotel</span>
                                </a>
                              </li>
                            </ul>
                            <div className="media">
                              <a href="#" className="d-inline-block mr-3" tabIndex={0}><img src="./images/listing/testimonial-1.png" alt="testimonial" className="rounded-circle" />
                              </a>
                              <div className="media-body lh-14 font-size-sm">Overlooking Bloomsbury's
                                Russell Square
                                and
                                a 2 minutes' walk from the tube station of the same name...
                              </div>
                            </div>
                          </div>
                          <ul className="list-inline card-footer rounded-0 border-top pt-3 mt-5 bg-transparent px-0 store-meta d-flex align-items-center">
                            <li className="list-inline-item">
                              <span className="d-inline-block mr-1">
                                <i className="fal fa-map-marker-alt">
                                </i>
                              </span>
                              <a href="#" className="text-secondary text-decoration-none link-hover-secondary-blue" tabIndex={0}>
                                San Francisco, CA</a>
                            </li>
                            <li className="list-inline-item separate" />
                            <li className="list-inline-item">
                              <span className="text-green">Open now!</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      </div>
                      <div>
                                <div className="box" data-animate="fadeInUp" style={{width: '100%', display: 'inline-block'}}>
                        <div className="store card border-0 rounded-0">
                          <div className="position-relative store-image">
                            <a href="listing-details-full-gallery.html" tabIndex={0}>
                              <img src="images/shop/shop-1.jpg" alt="store 1" className="card-img-top rounded-0" />
                            </a>
                            <div className="image-content position-absolute d-flex align-items-center">
                              <div className="content-left">
                                <div className="badge badge-primary">Featured</div>
                              </div>
                              <div className="content-right ml-auto d-flex w-lg show-link">
                                <a href="images/shop/full-shop-1.jpg" className="item viewing" data-toggle="tooltip" data-placement="top"  data-gtf-mfp="true" tabIndex={0} data-original-title="Quickview">
                                  <svg className="icon icon-expand">
                                    <use xlinkHref="#icon-expand" />
                                  </svg>
                                </a>
                                <a href="#" className="item marking" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Bookmark">
                                  <i className="fal fa-bookmark" /></a>
                                <a href="#" className="item" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Compare">
                                  <svg className="icon icon-chart-bars">
                                    <use xlinkHref="#icon-chart-bars" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body px-0 pb-0 pt-3">
                            <a href="listing-details-full-gallery.html" className="card-title h5 text-dark d-inline-block mb-2" tabIndex={0}><span className="letter-spacing-25">Roman
                                Kraft Hotel</span></a>
                            <ul className="list-inline store-meta mb-4 font-size-sm d-flex align-items-center flex-wrap">
                              <li className="list-inline-item"><span className="badge badge-success d-inline-block mr-1">5.0</span><span>4 rating</span>
                              </li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item"><span className="mr-1">From</span><span className="text-danger font-weight-semibold">$56.00</span></li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item">
                                <a href="#" className="link-hover-secondary-primary" tabIndex={0}>
                                  <svg className="icon icon-bed">
                                    <use xlinkHref="#icon-bed" />
                                  </svg>
                                  <span>Hotel</span>
                                </a>
                              </li>
                            </ul>
                            <div className="media">
                              <a href="#" className="d-inline-block mr-3" tabIndex={0}><img src="./images/listing/testimonial-1.png" alt="testimonial" className="rounded-circle" />
                              </a>
                              <div className="media-body lh-14 font-size-sm">Overlooking Bloomsbury's
                                Russell Square
                                and
                                a 2 minutes' walk from the tube station of the same name...
                              </div>
                            </div>
                          </div>
                          <ul className="list-inline card-footer rounded-0 border-top pt-3 mt-5 bg-transparent px-0 store-meta d-flex align-items-center">
                            <li className="list-inline-item">
                              <span className="d-inline-block mr-1">
                                <i className="fal fa-map-marker-alt">
                                </i>
                              </span>
                              <a href="#" className="text-secondary text-decoration-none link-hover-secondary-blue" tabIndex={0}>
                                San Francisco, CA</a>
                            </li>
                            <li className="list-inline-item separate" />
                            <li className="list-inline-item">
                              <span className="text-green">Open now!</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      </div>
                      <div>
                                <div className="box" data-animate="fadeInUp" style={{width: '100%', display: 'inline-block'}}>
                        <div className="store card border-0 rounded-0">
                          <div className="position-relative store-image">
                            <a href="listing-details-full-gallery.html" tabIndex={0}>
                              <img src="images/shop/shop-1.jpg" alt="store 1" className="card-img-top rounded-0" />
                            </a>
                            <div className="image-content position-absolute d-flex align-items-center">
                              <div className="content-left">
                                <div className="badge badge-primary">Featured</div>
                              </div>
                              <div className="content-right ml-auto d-flex w-lg show-link">
                                <a href="images/shop/full-shop-1.jpg" className="item viewing" data-toggle="tooltip" data-placement="top"  data-gtf-mfp="true" tabIndex={0} data-original-title="Quickview">
                                  <svg className="icon icon-expand">
                                    <use xlinkHref="#icon-expand" />
                                  </svg>
                                </a>
                                <a href="#" className="item marking" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Bookmark">
                                  <i className="fal fa-bookmark" /></a>
                                <a href="#" className="item" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Compare">
                                  <svg className="icon icon-chart-bars">
                                    <use xlinkHref="#icon-chart-bars" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body px-0 pb-0 pt-3">
                            <a href="listing-details-full-gallery.html" className="card-title h5 text-dark d-inline-block mb-2" tabIndex={0}><span className="letter-spacing-25">Roman
                                Kraft Hotel</span></a>
                            <ul className="list-inline store-meta mb-4 font-size-sm d-flex align-items-center flex-wrap">
                              <li className="list-inline-item"><span className="badge badge-success d-inline-block mr-1">5.0</span><span>4 rating</span>
                              </li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item"><span className="mr-1">From</span><span className="text-danger font-weight-semibold">$56.00</span></li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item">
                                <a href="#" className="link-hover-secondary-primary" tabIndex={0}>
                                  <svg className="icon icon-bed">
                                    <use xlinkHref="#icon-bed" />
                                  </svg>
                                  <span>Hotel</span>
                                </a>
                              </li>
                            </ul>
                            <div className="media">
                              <a href="#" className="d-inline-block mr-3" tabIndex={0}><img src="./images/listing/testimonial-1.png" alt="testimonial" className="rounded-circle" />
                              </a>
                              <div className="media-body lh-14 font-size-sm">Overlooking Bloomsbury's
                                Russell Square
                                and
                                a 2 minutes' walk from the tube station of the same name...
                              </div>
                            </div>
                          </div>
                          <ul className="list-inline card-footer rounded-0 border-top pt-3 mt-5 bg-transparent px-0 store-meta d-flex align-items-center">
                            <li className="list-inline-item">
                              <span className="d-inline-block mr-1">
                                <i className="fal fa-map-marker-alt">
                                </i>
                              </span>
                              <a href="#" className="text-secondary text-decoration-none link-hover-secondary-blue" tabIndex={0}>
                                San Francisco, CA</a>
                            </li>
                            <li className="list-inline-item separate" />
                            <li className="list-inline-item">
                              <span className="text-green">Open now!</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      </div>
                      <div>
                                <div className="box" data-animate="fadeInUp" style={{width: '100%', display: 'inline-block'}}>
                        <div className="store card border-0 rounded-0">
                          <div className="position-relative store-image">
                            <a href="listing-details-full-gallery.html" tabIndex={0}>
                              <img src="images/shop/shop-1.jpg" alt="store 1" className="card-img-top rounded-0" />
                            </a>
                            <div className="image-content position-absolute d-flex align-items-center">
                              <div className="content-left">
                                <div className="badge badge-primary">Featured</div>
                              </div>
                              <div className="content-right ml-auto d-flex w-lg show-link">
                                <a href="images/shop/full-shop-1.jpg" className="item viewing" data-toggle="tooltip" data-placement="top"  data-gtf-mfp="true" tabIndex={0} data-original-title="Quickview">
                                  <svg className="icon icon-expand">
                                    <use xlinkHref="#icon-expand" />
                                  </svg>
                                </a>
                                <a href="#" className="item marking" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Bookmark">
                                  <i className="fal fa-bookmark" /></a>
                                <a href="#" className="item" data-toggle="tooltip" data-placement="top"  tabIndex={0} data-original-title="Compare">
                                  <svg className="icon icon-chart-bars">
                                    <use xlinkHref="#icon-chart-bars" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body px-0 pb-0 pt-3">
                            <a href="listing-details-full-gallery.html" className="card-title h5 text-dark d-inline-block mb-2" tabIndex={0}><span className="letter-spacing-25">Roman
                                Kraft Hotel</span></a>
                            <ul className="list-inline store-meta mb-4 font-size-sm d-flex align-items-center flex-wrap">
                              <li className="list-inline-item"><span className="badge badge-success d-inline-block mr-1">5.0</span><span>4 rating</span>
                              </li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item"><span className="mr-1">From</span><span className="text-danger font-weight-semibold">$56.00</span></li>
                              <li className="list-inline-item separate" />
                              <li className="list-inline-item">
                                <a href="#" className="link-hover-secondary-primary" tabIndex={0}>
                                  <svg className="icon icon-bed">
                                    <use xlinkHref="#icon-bed" />
                                  </svg>
                                  <span>Hotel</span>
                                </a>
                              </li>
                            </ul>
                            <div className="media">
                              <a href="#" className="d-inline-block mr-3" tabIndex={0}><img src="./images/listing/testimonial-1.png" alt="testimonial" className="rounded-circle" />
                              </a>
                              <div className="media-body lh-14 font-size-sm">Overlooking Bloomsbury's
                                Russell Square
                                and
                                a 2 minutes' walk from the tube station of the same name...
                              </div>
                            </div>
                          </div>
                          <ul className="list-inline card-footer rounded-0 border-top pt-3 mt-5 bg-transparent px-0 store-meta d-flex align-items-center">
                            <li className="list-inline-item">
                              <span className="d-inline-block mr-1">
                                <i className="fal fa-map-marker-alt">
                                </i>
                              </span>
                              <a href="#" className="text-secondary text-decoration-none link-hover-secondary-blue" tabIndex={0}>
                                San Francisco, CA</a>
                            </li>
                            <li className="list-inline-item separate" />
                            <li className="list-inline-item">
                              <span className="text-green">Open now!</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      </div>
            
            </Slick>

        )
    }
}