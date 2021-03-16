import React from "react";
import Router from "next/router"
import Select from 'react-select'
import Link from 'next/link'
import {GetDistrict, GetCategory} from "../../Api/Api"

import {PathNameReplace} from "../../Api/pathname"

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data }) => {
      return {
        ...styles,
      };
    },
  };

const Prices = [
    {value: 1 , label: "Nhỏ hơn 150k"},
    {value: 2 , label: "150k - 250k"},
    {value: 3 , label: "250k - 500k"},
    {value: 4 , label: "500k - 1 triệu"},
    {value: 5 , label: "Lớn hơn 1 triệu"}
]

export default class Banner extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
        ListDistrict: undefined,
        ListCategory: undefined,
        min_price: undefined,
        max_price: undefined,
        category: undefined,
        district: undefined
    })
  }
  
  componentDidMount(){
    GetDistrict().then(res => this.setState({ListDistrict: res.list_district}))
    GetCategory().then(res => this.setState({ListCategory: res.list_category}))
  }



  showSelectDistrict = () => {
      if(this.state.ListDistrict != undefined){
          return(
            <Select
            instanceId="KhuVuc"
            placeholder="Khu vực"
            styles={colourStyles}
            className="autocomplete-input"
            onChange = {(value) => this.setState({district: value.district_name})}
            options={this.state.ListDistrict} 
            getOptionLabel={(option)=>option.district_name} 
            getOptionValue={(option)=>option.district_name}/>
          )
      }
  }

  showCategory = () => {
    if(this.state.ListCategory != undefined){
        return(
          <Select
          instanceId="DanhMuc"
          placeholder="Danh mục"
          styles={colourStyles}
          className="autocomplete-input"
          onChange = {(value) => this.setState({category: value.name_link})}
          options={this.state.ListCategory} 
          getOptionLabel={(option)=>option.name} 
          getOptionValue={(option)=>option.name_link}/>
        )
    }
  }

  showPrices = () => {
        return(
          <Select
          instanceId="GiaTB"
          placeholder="Giá trung bình"
          styles={colourStyles}
          onChange={(value) => this.selectPrice(value.value)}
          className="autocomplete-input"
          options={Prices} />
        )
  }

  selectPrice = (value) => {
      switch(value){
          case 1: {
            this.setState({min_price: 0, max_price: 150000})
            break;
          }
          case 2:{
            this.setState({min_price: 150000, max_price: 250000})
            break;
          }
          case 3:{
            this.setState({min_price: 250000, max_price: 500000})
            break;
          }
          case 4: {
            this.setState({min_price: 500000, max_price: 1000000})
            break;
          }
          case 5: {
            this.setState({min_price: 1000000, max_price: undefined})
            break;
          }
        
      }
  }

  onFilter = () => {
      const {category, district, min_price, max_price} = this.state
        let query =  PathNameReplace(1, category, district, min_price, max_price, undefined)
       
    Router.push({
        pathname: "/nha-hang",
        query: query
    })
   
  }

  render() {
    return (
      <section className="hero-section" data-scrollax-parent="true" style={{height:"71vh"}}>
            <div className="bg-tabs-wrap" >
                <img className="bg bg_tabs" 
                src="https://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/ho-chi-minh-city/top10/top10-ho-chi-minh-restaurants/pagePropertiesImage/10-restaurants-ho-chi-minh.jpg.jpg"  style={{"backgroundAttachment":"fixed"}}/>
                <div className="overlay op7" />
            </div>
            <div className="container small-container">
                <div className="intro-item fl-wrap">
                <span className="section-separator" />
                <div >
                    <h1>Kiếm món ngon chỉ có tại TikFood</h1>
                </div>
                <h3>Ăn là sẽ nhớ – nhớ rồi sẽ tới ăn cùng bạn.</h3>
                </div>
                {/* main-search-input-tabs*/}
                <div className="main-search-input-tabs  tabs-act fl-wrap">                  
                <div className="tabs-container fl-wrap  ">
                    {/*tab */}
                    <div className="tab">
                    <div id="tab-inpt1" className="tab-content first-tab">
                        <div className="main-search-input-wrap fl-wrap">
                        <div className="main-search-input fl-wrap">
                            <div className="main-search-input-item">
                            <label><i className="fal fa-map-marker-check" /></label>
                            {this.showSelectDistrict()}
                            </div>
                            <div className="main-search-input-item location autocomplete-container">
                            <label><i className="fal fa-bars" /></label>
                            {
                                this.showCategory()
                            }
                            </div>
                            <div className="main-search-input-item location autocomplete-container">
                            <label><i className="fal fa-sack-dollar" /></label>
                            {
                                this.showPrices()
                            }
                            </div>
                            <button onClick={()=> {this.onFilter()}} className="main-search-button color2-bg" >Tìm kiếm <i className="far fa-search" /></button>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/*tab end*/}
                    {/*tab */}
                    </div>
                </div>
                {/* main-search-input-tabs end*/}
                <div className="hero-categories fl-wrap">
                <h4 className="hero-categories_title">Hoặc có thể tìm nhanh bằng các loại nhà hàng </h4>
                <ul className="no-list-style">
                          {this.state.ListCategory != undefined &&
                            this.state.ListCategory.slice(0,5).map((item,index) => {
                              return(
                              <li key={index}><Link href={`/nha-hang?page=1&category=` + item.name_link} ><a><span style={{fontWeight: '800'}}>{item.name}</span></a></Link></li> 
                              )
                            })
                          }
                    
                </ul>
                </div>
            </div>
            <div className="header-sec-link">
                <a href="#sec1" className="custom-scroll-link"><i className="fal fa-angle-double-down" /></a> 
            </div>
            </section>
  )
}
  }
    