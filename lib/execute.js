const axios = require('axios');

const BASE_URL = "https://portal.unn.ru/ruzapi/";

async function exec(method, option, querry) {

    if(!querry) querry = {};

    let params = '?';
    for(let prop in querry)
        params += `${prop}=${encodeURIComponent(querry[prop])}&`;    
    
    params = params.substring(0,params.length - 1);
    let res = await axios.get(BASE_URL + `${method}/${option}${params}`);

    return res.data;

}

module.exports = exec;