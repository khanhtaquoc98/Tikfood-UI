
import React from "react";
import Router from 'next/router'
import Link from 'next/link'
import Select from 'react-select'
import {PathNameReplace} from "../../Api/pathname"
import {GetDistrict, GetCategory} from "../../Api/Api"
import { Rate, Slider } from 'antd';

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data }) => {
      return {
        ...styles,
        textAlign: 'left'
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


export default class FilterRestaurant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            min_price: undefined,
            max_price: undefined,
            category: undefined,
            district: undefined,
            is_comment: undefined,
            average_stars: 0,
        }
    }

    componentDidMount(){
        GetDistrict().then(res => this.setState({ListDistrict: res.list_district}))
        GetCategory().then(res => this.setState({ListCategory: res.list_category}))
        this.ResetFilter()
      }
    
      componentDidUpdate(prevProps, prevState){
        if (prevProps.query !== this.props.query){
            this.ResetFilter()
        }
      }
    
      ResetFilter = () => {
          const {query} = this.props;
          this.setState({average_stars: 0})
          if(query.category != undefined) this.setState({category : query.category}); else this.setState({category : undefined});
          if(query.district != undefined) this.setState({district : query.district}); else this.setState({district : undefined});
          if(query.min_price != undefined) this.setState({min_price : query.min_price*1}); else this.setState({min_price : undefined});
            query.max_price != undefined ?  this.setState({max_price : query.max_price*1}) : this.setState({max_price : undefined})
          if(query.isComment != undefined) this.setState({is_comment: query.isComment});
          if(query.average_stars != undefined) this.setState({average_stars : query.average_stars}); else this.setState({average_stars : undefined});
      }

      showSelectDistrict = () => {
        if(this.state.ListDistrict != undefined){
            let Item = undefined
            if(this.state.district != undefined){
                Item =  this.state.ListDistrict.filter((item) => item.district_name.toString() == this.state.district.toString())
            }
            return(
                <Select
                value = {Item == undefined ? null : Item}
                placeholder="Khu vực"
                styles={colourStyles}
                className=""
                onChange = {(value) => {
                    this.setState({district: value.district_name})
                }}
                options={this.state.ListDistrict} 
                getOptionLabel={(option)=>option.district_name} 
                getOptionValue={(option)=>option.district_name}/>
              )
        }
    }

    showCategory = () => {
        if(this.state.ListCategory != undefined){
            let Item = undefined
            if(this.state.category != undefined){
                Item =  this.state.ListCategory.filter((item) => item.name_link.toString() == this.state.category.toString())
            }
            return(
              <Select
              value = {Item == undefined ? null : Item}
              placeholder="Danh mục"
              styles={colourStyles}
              className=""
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
          className=""
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

    HandleGridView = () => {
        this.props.HandleGridView();
    }

    handleChangeRate = (value) => {
        this.setState({average_stars : value})
    }

    onChangeSliderPrice = (value) => {
        this.setState({min_price: value[0], max_price: value[1]})
    }

    onFilter = () => {
        const {category, district, min_price, max_price, average_stars, is_comment} = this.state
          let query =  PathNameReplace(1, category, district, min_price <= 0 ? undefined : min_price, max_price, average_stars == 0 ? undefined : average_stars, is_comment)
          
         
      Router.push({
          pathname: "/nha-hang",
          query: query
      })
     
      let category1 = category != undefined ? category : '';
      let district1 = district != undefined ? district : '';
      let average_stars1 = (average_stars!=undefined ) ? average_stars : '';
      let min_price1 = min_price != undefined ? min_price : '';
      let max_price1 = max_price!= undefined ? max_price : '';
      let is_comment1 = is_comment!= undefined ? is_comment : false;

        this.props.FetchRestaurantsPage(1, category1, district1, average_stars1, min_price1, max_price1, is_comment1)
    }

    FetchRestaurantsPage = (pageNumber, category, district, average_stars, min_price, max_price, is_comment) => {
        //console.log(pageNumber, category, district, average_stars, min_price, max_price)
        FetchRestaurants(pageNumber, category, district, average_stars, min_price, max_price, is_comment).then(res => {
            if(res.status == 200){
                this.setState({DataRestaurant : res.data})
            }
        }).catch(err => Router.push("/nha-hang/khong-tim-thay"))
    }

    render(){
        return(
            <div className="listsearch-input-wrap lws_mobile fl-wrap" style={{display: this.props.isShowFilter ? "block" : "none", height: this.props.isShowFilter ? "100%" : "0%"}}>
                <div className="listsearch-input-wrap_contrl fl-wrap d-none d-md-block">
                    <div className="container">
                    <ul className="tabs-menu fl-wrap no-list-style">
                        <li className="current"><a href="#filters-search"> <i className="fal fa-sliders-h" /> Bộ lọc </a></li>
                    </ul>
                    </div>
                </div>
                <div className="clearfix" />
                <div className="container">
                    {/*tabs */}                       
                    <div className="tabs-container fl-wrap">
                    {/*tab */}
                    <div className="tab">
                        <div id="filters-search" className="tab-content  first-tab ">
                        <div className="fl-wrap">
                            <div className="row">
                            {/* listsearch-input-item*/}
                            <div className="col-md-4">
                                <div className="listsearch-input-item">
                                <span className="iconn-dec"><i className="fal fa-bars" /></span>
                                {this.showCategory()}
                                </div>
                            </div>
                            {/* listsearch-input-item end*/}
                            {/* listsearch-input-item*/}
                            <div className="col-md-4">
                                <div className="listsearch-input-item">
                                <span className="iconn-dec"><i className="fal fa-bars" /></span>
                                {this.showSelectDistrict()}
                                </div>
                            </div>
                            {/* listsearch-input-item end*/}
                            {/* listsearch-input-item*/}
                            <div className="col-md-4 text-search-2" style={{marginBottom: '1rem'}}>
                                <span style={{marginRight: '1rem'}}>Đánh giá: </span>
                                <Rate  onChange={this.handleChangeRate} value={this.state.average_stars} />
                            </div>
                            {/* listsearch-input-item end*/}  
                            {/* listsearch-input-item*/}
                           
                            {/* listsearch-input-item end*/}                                         
                            </div>

                            <div className="row">
                            <div className="col-md-4">
                                <div className="listsearch-input-item">
                                <span className="iconn-dec"><i className="fal fa-bars" /></span>
                                {this.showPrices()}
                                </div>
                            </div>

                          <div className="col-md-4"><div className=" fl-wrap filter-tags">
                                <ul className="no-list-style" style={{marginTop: ".6rem"}}>
                                <li>
                                    <input id="check-aa" type="checkbox"  defaultChecked={this.state.is_comment} onChange={(e) => {this.setState({is_comment : e.target.checked})}}/>
                                    <label htmlFor="check-aa">Sắp xếp theo đánh giá</label>
                                </li>
                                </ul>
                            </div>
                            </div>
                            {/* listsearch-input-item end*/}  
                            {/* listsearch-input-item*/}
                            <div className="col-md-3">
                                <div className="listsearch-input-item">
                                <button onClick={() => this.onFilter()}
                                 className="header-search-button color-bg"
                                  style={{borderRadius:"0px"}}>
                                      <i className="far fa-search" /><span>Lọc</span></button>
                                </div>
                            </div>
                            </div>
                                                       
                            <div className="more-filter-option-wrap">
                          
                            <div className="clear-filter-btn color" onClick={this.ResetFilter}><i className="far fa-redo" /> Reset bộ lọc</div>
                            <div className="clear-filter-btn color" onClick={this.HandleGridView}>
                                <i className={`fal ${this.props.isGridView ? "fa-list" : "fa-th" }`} /> {this.props.isGridView ? "Hàng" : "Cột"}</div>
                                <Link href="nha-hang?page=1&district=cua-hang-gan-ban">
                                <div className="more-filter-option-btn act-hiddenpanel active-hidden-opt-btn">
                                    <i class="fas fa-street-view"></i> <span>Cửa hàng gần bạn</span>
                                </div>
                                </Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/*tab end*/}
                   
                    </div>
                    {/*tabs end*/}
                </div>
                </div>

        )
    }
}