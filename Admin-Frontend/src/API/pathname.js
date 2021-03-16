export const PathNameReplace = (page, category, district, min_price, max_price, average_stars) => {
    let query = {}
    if(page != undefined && page != "")  query['page'] = page; else query[page] = 1;
    if(category != undefined && category != "")  query['category'] = category; 
    if(district != undefined && district != "")  query['district'] = district; 
    if(min_price != undefined && min_price != "")  query['min_price'] = min_price; 
    if(max_price != undefined && max_price != "")  query['max_price'] = max_price; 
    if(average_stars != undefined && average_stars != "")   query['average_stars'] = average_stars; 
    return query;
}


export const ChangeLinkImage = (image_url) =>{
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
    }


export const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
}

export const TransHTML = (html) => {
    const src_1 = 'src=\"../Assets'
    const data_src_1 = 'data-src=\"../Assets'
    const src_2 = 'src="https://'
    const data_src_2 = 'data-src="https://'
    const str_main_1 = replaceAll(html,src_1,data_src_1)
    const str_main_2 = replaceAll(str_main_1,data_src_2,src_2)
    return str_main_2
}