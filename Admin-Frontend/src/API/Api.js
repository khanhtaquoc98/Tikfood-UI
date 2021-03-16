
import Cookies from 'universal-cookie'
import axios from 'axios'
const cookies = new Cookies()

const API_URL = "http://localhost:8080"
const API_URL_2 = "http://localhost:8080/api"
const API_URL_3 = "http://localhost:8080/api/admin"


//List Restaurant
export const FetchAllRestaurant = (pageNumber) => {
    axios.get(API_URL + "/tat-ca-nha-hang/page=" + pageNumber)

}

//Get Top Restaurant
export const FetchTopReview = (pageNumber) => {
    return axios.get(API_URL + "/top-nha-hang/so-danh-gia-nhieu-nhat&page=" + pageNumber).then(res => res) .catch(err => null)
}

export const FetchTopStar = (pageNumber) => {
    return axios.get(API_URL + "/top-nha-hang/so-sao-cao-nhat&page=" + pageNumber).then(res => res) .catch(err => null)
}


//Restaurant
export const FetchRestaurant =  (url, id) => {
    return axios.post(API_URL + "/nha-hang/" + url)
     .then(res => res.data)
     .catch(err =>  null)
}


//Login
export const LoginUser =  (email, password) => {
    return axios.post(API_URL + "/dang-nhap/", {
        "email" : email,
        "password" : password
    })
     .then(res => res.data)
     .catch(err =>  null)
}

//GetUserwithToken
export const GetUserWToken = (token) => {
    return axios.get(API_URL + "/nguoi-dung/thong-tin-ca-nhan" ,{
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data)
    .catch(err => null)
}

//CheckAdmin 
export const CheckAdmin = () => {
    if(cookies.get('admin') != undefined){
      return true;
      } else  return false;
}

//Nha Hang yeu thich
export const UserLikeStore =  (token, idStore) => {
    return axios.post(API_URL + "/nha-hang-yeu-thich", {
        "store_id" : idStore
    },
    {
        headers: {
            'auth-token' : token
        }
    }
    )
     .then(res => res.data)
     .catch(err =>  null)
}

//API ADMIN
export const FetchRestaurants = (pageNumber, category, district, average_stars, min_price, max_price) => {
    return axios.get(API_URL + "/danh-sach-cua-hang?page=" + pageNumber 
    + "&category=" + category
    + "&district=" + district
    + "&average_stars=" + average_stars
    + "&min_price=" + min_price
    + "&max_price=" + max_price).then(res => res).catch(err => null)
}

export const FetchDetailRestaurant =  (token, idRestaurant) => {
    return axios.get(API_URL_2 + "/stores/store_id=" + idRestaurant,
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const GetComment = (id) => {
    return axios.get(API_URL_2 + "/store/comment/store_id=" + id).then(res => res.data).catch(err => null)
}


//Get list comment User
export const GetCommentOfUser = (token, userid) => {
    return axios.get(API_URL_2 + "/user/comment/user_id=" + userid ,{
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data)
    .catch(err => null)
}

//Chưa làm
export const DeleteCommentforUser = (token, idComment) => {
    return axios.delete(API_URL_2+ "/comment/comment_id=" + idComment, {
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data).catch(err => null)
}

export const GetLikeStoreOfUser = (token, userid) => {
    return axios.get(API_URL_2 + "/user/likestore/user_id=" + userid ,{
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data)
    .catch(err => null)
}

export const DeleteLikeStoreOfUser = (token, userid) => {
    return axios.delete(API_URL_2 + "/user/likestore_id=" + userid ,{
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data)
    .catch(err => null)
}

export const FetchAllPartner =  (token) => {
    return axios.get(API_URL_2 + "/allpartners",
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const FetchStoreofPartner =  (token, id) => {
    return axios.get(API_URL_2 + "/partner?user_id=" + id,
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const PostStoreofPartner = (token, id_store, id_partner) => {
    return axios.post(API_URL_2 + "/partner?store_id=" +id_store + "&user_id=" + id_partner,{}, {
        headers: {
            'auth-token' : token
        }
    }).then(res => res).catch(err => null)
}

export const DeleteStoreofPartner = (token, id_store, id_partner) => {
    return axios.delete(API_URL_2 + "/partner?store_id=" +id_store + "&user_id=" + id_partner, {
        headers: {
            'auth-token' : token
        }
    }).then(res => res).catch(err => null)
}

export const FetchAllReserve = (token, store_id) => {
    return axios.get(API_URL_2 + "/reserve/store_id=" + store_id, {
        headers: {
            'auth-token' : token
        }
    }).then(res => res).catch(err => null)
}

export const DeleteReserver = (token, reserverID) => {
    return axios.delete(API_URL_2 + "/reserve/reserve_id=" +reserverID , {
        headers: {
            'auth-token' : token
        }
    }).then(res => res).catch(err => null)
}

export const FetchUser =  (token) => {
    return axios.get(API_URL_2 + "/user",
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const DeleteUser =  (token,id) => {
    return axios.delete(API_URL_2 + "/user/user_id=" + id,
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}


export const FetchUserDetail =  (token, idUser) => {
    return axios.get(API_URL_2 + "/user/user_id=" + idUser,
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const PutUser = (token, userId, gender , address, phone, avatar, fullname) => {
    //console.log(userId, gender, address, phone, avatar, fullname)
    //console.log(token)
    return axios.put(API_URL_2 + "/user/user_id=" + userId + "?gender=" + gender + "&address=" + address + "&phone=" + phone + "&avatar=" + avatar + "&fullname=" + fullname, {},{
        headers: {
            'auth-token' : token
        }
    })
     .then(res => res.data)
     .catch(err =>  null)
}

export const PutActiveUser = (token, idUser, Active) => {
    return axios.put(API_URL_2 + "/user/isactive",
    {
        "user_id" : idUser,
        "isActive" : Active,
    }, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

//Get Địa điểm (Quận)
export const FetchDistrict = () => {
    return axios.get(API_URL + "/quan").then(res => res.data).catch(err => null)
}

export const FetchCategory =  (token) => {
    return axios.get(API_URL_2 + "/categories",
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const addCategory =  (token,nameCategory) => {
    return axios.post(API_URL_2 + "/categories",
    {
        "name" : nameCategory,
    }, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const deleteCategory =  (token,idCategory) => {
    return axios.delete(API_URL_2 + "/category/category_id=" + idCategory, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const getDetailCategory =  (token,idCategory) => {
    return axios.get(API_URL_2 + "/category/category_id=" + idCategory, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const putCategory =  (token,idCategory,nameCategory) => {
    return axios.put(API_URL_2 + "/category/category_id=" + idCategory,
    {
        "name" : nameCategory,
    }, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

//Get khu vưc(Quận)
export const FetchDisTrict =  (token) => {
    return axios.get(API_URL_2 + "/districts",
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const addDisTrict =  (token,name) => {
    return axios.post(API_URL_2 + "/districts",
    {
        "district_name" : name,
    }, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const deleteDisTrict=  (token,id) => {
    return axios.delete(API_URL_2 + "/district/district_id=" + id, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const getDetailDisTrict =  (token,id) => {
    return axios.get(API_URL_2 + "/district/district_id=" + id, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const putDisTrict =  (token,id,name) => {
    return axios.put(API_URL_2 + "/district/district_id=" + id,
    {
        "district_name" : name,
    }, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const addStore = (token, name, min_price, max_price, address_detail, district_id, district, category_id, longtitude, latitude, time_open, short_decription, list_images, introduction, sale_detail, menu) => {
    return axios.post(API_URL_2+ "/stores",{
            'name': name,
            'min_price': Number(min_price),
            'max_price': Number(max_price),
            'address_detail': address_detail,
            'district_id': district_id,
            'district': district,
            'category_id': category_id,
            'longtitude': (longtitude),
            'latitude': (latitude),
            'link_url': 'http://www.google.com/maps/place/'+ latitude + ',' + longtitude,
            'time_open': time_open,
            'short_decription': short_decription,
            'list_images': list_images,
            'introduction': introduction,
            'sale_detail': sale_detail,
            'menu': menu,
    },{
        headers: {
            'auth-token' : token
        }
    })

}

export const putStore =  (token,idStore, name, min_price, max_price, address_detail, district_id, district, category_id, longtitude, latitude, time_open, short_decription, list_images, introduction, sale_detail, menu) => {
    return axios.put(API_URL_2 + "/stores/store_id=" + idStore,
    {
        'name': name,
        'min_price': Number(min_price),
        'max_price': Number(max_price),
        'address_detail': address_detail,
        'district_id': district_id,
        'district': district,
        'category_id': category_id,
        'longtitude': (longtitude),
        'latitude': (latitude),
        'link_url': 'http://www.google.com/maps/place/'+ latitude + ',' + longtitude,
        'time_open': time_open,
        'short_decription': short_decription,
        'list_images': list_images,
        'introduction': introduction,
        'sale_detail': sale_detail,
        'menu': menu,
    }, 
    {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const deleteStore =  (token,idStore) => {
    return axios.put(API_URL_2 + "/stores/store_id=" + idStore, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const checkOkStore =  (token,idStore) => {
    return axios.post(API_URL_2 + "/admin/storepartner/ischeckok",{
        "store_id" : idStore
    }, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const checkCancelStore =  (token,idStore) => {
    return axios.post(API_URL_2 + "/admin/storepartner/ischeckcancel",{
        "store_id" : idStore
    }, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

//API DASHBOARD
export const getSoLuong =  (token) => {
    return axios.get(API_URL + "/soluong", {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const getSLCHTheoDanhMuc =  (token) => {
    return axios.get(API_URL + "/soluongcuahangtheodanhmuc", {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const getSLCHTheoQuan =  (token) => {
    return axios.get(API_URL + "/soluongcuahangtheoquan", {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const getBLtheoThang =  (token, thang) => {
    return axios.get(API_URL + "/soluongbinhluantheothang?month=" +  thang, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const getBLtheoNam =  (token, nam) => {
    return axios.get(API_URL + "/soluongbinhluantheothangcuanam?year=" + nam, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const getYeuThichtheoThang =  (token, thang) => {
    return axios.get(API_URL + "/soluongthichcuahangtheothang?month=" +  thang, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

export const getYeuThichtheoNam =  (token, nam) => {
    return axios.get(API_URL + "/soluongthichcuahangtheothangcuanam?year=" + nam, {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}

//Post Store partner

export const FetchRestaurantsPendding = (token) => {
    return axios.get(API_URL_2 + "/admin/storepartner", {
        headers: {
            'auth-token' : token
        }
    }
    ).then(res => res.data)
     .catch(err =>  null)
}