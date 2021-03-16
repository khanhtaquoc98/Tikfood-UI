export const PathNameReplace = (page, category, district, min_price, max_price, average_stars, is_comment) => {
    let query = {}
    if(page != undefined)  query['page'] = page; else query[page] = 1;
    if(category != undefined)  query['category'] = category; 
    if(district != undefined)  query['district'] = district; 
    if(min_price != undefined)  query['min_price'] = min_price; 
    if(max_price != undefined)  query['max_price'] = max_price; 
    if(average_stars != undefined)   query['average_stars'] = average_stars; 
    if(is_comment != undefined)   query['isComment'] = is_comment; 
    return query;
}
    

export const checkMail = (email) => {
    var regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    var result = regex.test(email);
    return result;
}

export const ChangeLinkImage = (image_url) =>{
    if(image_url){
        const isCheck = image_url.indexOf("-100-") 
        const str_replace = '-normal-'
        var main_url
        if(isCheck == -1){
            main_url = image_url
        }
        else{
            const main_str3 = image_url.slice(0,isCheck)
            const main_str4 = image_url.slice(isCheck+5,image_url.length)
            main_url = main_str3+ str_replace + main_str4
        }
        return main_url
    } else return "https://img4.thuthuatphanmem.vn/uploads/2020/05/12/hinh-anh-xam-don-gian_103624444.jpg"
    
    }