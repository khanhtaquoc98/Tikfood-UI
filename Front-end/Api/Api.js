const API_URL = "http://localhost:8080"
const API_URL_2 = "http://localhost:8080/api"
const API_URL_3 = "http://localhost:8080/api/admin"

import axios from 'axios'

//sent mail book table
export const SentMailBookTable = (email, name, time, quantity,phone, name_store, store_id) => {
  return axios.post(API_URL + "/sendmailreserve", {
    "email": email,
    "name_user_reserve": name,
    "time_coming" : time,
    "quantity" : quantity,
    "phone": phone,
    "name_store" : name_store,
    "store_id": store_id}).then(res => res).catch(err => err)
}

//List Restaurant
export const FetchAllRestaurant = (pageNumber) => {
    axios.get(API_URL + "/tat-ca-nha-hang/page=" + pageNumber)
}

export const FetchRestaurantswithSearch = (text) => {
    return axios.get(API_URL + "/tim-kiem/search=" + text).then(res => res).catch(err => null)
}

export const GetRestaurantsNear = () => {
    return axios.get(API_URL + "/nguoi-dung/vi-tri").then(res => res).catch(err => null)
}

export const FetchStoreNear = (lng, lat) => {
    return axios.get(API_URL + "/nguoi-dung/vi-tri?longtitude=" + lng + "&latitude=" + lat).then(res => res).catch(err => null)
}

export const FetchRestaurants = (pageNumber, category, district, average_stars, min_price, max_price, is_comment) => {
    return axios.get(API_URL + "/danh-sach-cua-hang?page=" + pageNumber 
    + "&category=" + category
    + "&district=" + district
    + "&average_stars=" + average_stars
    + "&min_price=" + min_price
    + "&max_price=" + max_price + "&is_comment=" + is_comment).then(res => res) .catch(err => null)
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

export const GetComment = (id) => {
    return axios.get(API_URL_2 + "/store/comment/store_id=" + id).then(res => res.data).catch(err => null)
}

export const PostCommentUser = (token, content, star, sentimet, idStore) => {
    //console.log(token, content, star, idStore)
    return axios.post(API_URL + "/danh-gia-nha-hang", {
        "content" : content,
        "star" : star,
        "sentimet" : sentimet,
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

//Get Địa điểm (Quận)
export const GetDistrict = () => {
    return axios.get(API_URL + "/quan").then(res => res.data).catch(err => null)
}

//Get Category
export const GetCategory = () => {
    return axios.get(API_URL + "/danh-muc-cua-hang").then(res => res.data).catch(err => null)
}

////========USER========///////

//Login
export const LoginUser =  (email, password) => {
    return axios.post(API_URL + "/dang-nhap/", {
        "email" : email,
        "password" : password
    })
     .then(res => res.data)
     .catch(err =>  null)
}

export const UserRegister =  (email, password) => {
    return axios.post(API_URL + "/dang-ki/", {
        "email" : email,
        "password" : password
    })
     .then(res => res.data)
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

export const GetLikeStoreforUser = (token) => {
    return axios.get(API_URL + "/nguoi-dung/danh-sach/cua-hang-yeu-thich" ,{
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data)
    .catch(err => null)
}

export const DeleteLikeStoreforUser = (idLikestore, token) => {
    return axios.delete(API_URL + "/nha-hang-yeu-thich/likestore_id=" + idLikestore, {
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data).catch(err => null)
}

//Get list comment User
export const GetCommentforUser = (token) => {
    return axios.get(API_URL + "/nguoi-dung/danh-sach/danh-gia-cua-hang" ,{
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data)
    .catch(err => null)
}

export const DeleteCommentforUser = (idComment, token) => {
    return axios.delete(API_URL + "/danh-gia-nha-hang/comment_id=" + idComment, {
        headers: {
            'auth-token' : token
        }
    }).then(res => res.data).catch(err => null)
}

// Edit User
export const PutUser = (token, userId, gender , address, phone, avatar, fullname) => {
    //console.log(userId, gender, address, phone, avatar, fullname)
    //console.log(token)
    return axios.put(API_URL + "/nguoi-dung/thong-tin-ca-nhan/ref=" + userId + "?gender=" + gender + "&address=" + address + "&phone=" + phone + "&avatar=" + avatar + "&fullname=" + fullname, {},{
        headers: {
            'auth-token' : token
        }
    })
     .then(res => res.data)
     .catch(err =>  null)
}

//ResetPassWord 
export const PutPasswordUser = (idUser, password, confirmpassword) => {
    return axios.put(API_URL + "/user/resetpassword/user_id=" + idUser, {
        "password" : password,
        "confirmpassword" : confirmpassword
    })
     .then(res => res.data)
     .catch(err =>  null)
}

