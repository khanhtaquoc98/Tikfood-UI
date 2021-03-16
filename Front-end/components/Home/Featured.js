import React from "react";
import Link from 'next/link'

const ListDistrict = [
    {name : "Quận 1", link: "Q. 1", image: "https://topdiemden.com/wp-content/uploads/2019/10/bitexco.jpg"},
    {name : "Quận Bình Thạnh", link: "Q. Bình Thạnh", image: "https://kinhdoanhdiaoc.net/wp-content/uploads/2017/06/landmark-81-1.jpg"},
    {name : "Quận 7", link: "Q. 7", image: "https://thienduong.vn/Thienduong/Upload/images/hbn.jpg"},
    {name : "Quận Phú Nhuận", link: "Q. Phú Nhuận", image: "https://propzy.vn/tin-tuc/wp-content/uploads/2020/06/saigon2018_3d8df292f1e732d058db75c9ecf6c1c8_small_resize.jpg"},
    {name : "Quận 10", link: "Q. 10", image: "https://halotravel.vn/wp-content/uploads/2020/07/pho-di-bo-quan-10-6.jpg"}
]

export default class Featured extends React.Component {

   
    render(){ 
        return(       
        <section className="gray-bg hidden-section particles-wrapper">
        <div className="container">
            <div className="section-title">
            <h2>Khu vực đang hot</h2>
            <div className="section-subtitle">TikFood</div>
            <span className="section-separator" />
            <p>Tìm kiếm khu vực đang hot dành cho bạn.</p>
            </div>
            <div className="listing-item-grid_container fl-wrap">
            <div className="row">
                {/*  listing-item-grid  */}
                <div className="col-sm-4">
                <div className="listing-item-grid">
                    <div className="bg" style={{backgroundImage: "url('" + ListDistrict[0].image + "')"}} />
                    <div className="d-gr-sec" />
                    <div className="listing-item-grid_title">
                    <h3><Link href={`nha-hang?page=1&district=${ListDistrict[0].link}`}><a>{ListDistrict[0].name}</a></Link></h3>
                    </div>
                </div>
                </div>
                {/*  listing-item-grid end  */}
                {/*  listing-item-grid  */}
                <div className="col-sm-4">
                <div className="listing-item-grid">
                    <div className="bg" style={{backgroundImage: "url('" + ListDistrict[1].image + "')"}}/>
                    <div className="d-gr-sec" />
                    <div className="listing-item-grid_title">
                    <h3><Link href={`nha-hang?page=1&district=${ListDistrict[1].link}`}><a>{ListDistrict[1].name}</a></Link></h3>
                    </div>
                </div>
                </div>
                {/*  listing-item-grid end  */}                                
                {/*  listing-item-grid  */}
                <div className="col-sm-4">
                <div className="listing-item-grid">
                    <div className="bg" style={{backgroundImage: "url('" + ListDistrict[2].image + "')"}}/>
                    <div className="d-gr-sec" />
                    <div className="listing-item-grid_title">
                    <h3><Link href={`nha-hang?page=1&district=${ListDistrict[2].link}`}><a>{ListDistrict[2].name}</a></Link></h3>
                    </div>
                </div>
                </div>
                {/*  listing-item-grid end  */}
                {/*  listing-item-grid  */}
                <div className="col-sm-4">
                <div className="listing-item-grid">
                    <div className="bg" style={{backgroundImage: "url('" + ListDistrict[3].image + "')"}} />
                    <div className="d-gr-sec" />
                    <div className="listing-item-grid_title">
                    <h3><Link href={`nha-hang?page=1&district=${ListDistrict[3].link}`}><a>{ListDistrict[3].name}</a></Link></h3>
                    </div>
                </div>
                </div>
                {/*  listing-item-grid end  */}
                {/*  listing-item-grid  */}
                <div className="col-sm-8">
                <div className="listing-item-grid">
                    <div className="bg" style={{backgroundImage: "url('" + ListDistrict[4].image + "')"}} />
                    <div className="d-gr-sec" />
                    <div className="listing-item-grid_title">
                    <h3><Link href={`nha-hang?page=1&district=${ListDistrict[4].link}`}><a>{ListDistrict[4].name}</a></Link></h3>
                    </div>
                </div>
                </div>
                {/*  listing-item-grid end  */}                                                                                               
            </div>
            </div>
            <Link href="/nha-hang?page=1"><a className="btn dec_btn   color2-bg">Xem tất cả<i className="fal fa-arrow-alt-right" /></a></Link>
        </div>
        </section>
        )
    }
    }
   