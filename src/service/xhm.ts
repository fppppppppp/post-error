
import { servicePath } from "../config/config";
import { getUserInfo,UserInfo } from "../userinfo/index";
import { listen } from "../utils/obersve";


let serviceUrl = servicePath;
listen("changeUrl",(path)=>{
    serviceUrl = path ;
})


const gifPostApi = function(option: object,type = "er"){
    const gif = document.createElement("img");
    const postOption = createUrl({...option,_te:type});
    const path = serviceUrl+ "pr/e.gif"+postOption;
    gif.src = path;
};

function getPostInfo(): {
    _uu: string;
    _ct: string;
    _p: string;
    _uid: string;
}{
    let userinfo:UserInfo = getUserInfo();
    const { userid , uid, projectInfo,clientType} = userinfo;
    let option: any = {
        _uu:uid,
        _ct:clientType,
        _p:projectInfo,
    }
    if(userid){
        option._uid = userid;
    }
    return option;
}

function createUrl(info){
    let arr = [];
    const deInfo = getPostInfo();
    const op = {...info,...deInfo}
    for( let i in op ){
        let value = op[i];
        if(typeof value === "object"){
            value = JSON.stringify(value);
        }
        arr.push(`${i}=${value}`)
    }
    arr.push("_t="+  +new Date())
    return "?"+arr.join("&");
}

export const postCloseData = function(fb){
    let url = serviceUrl+"cl";
    navigator.sendBeacon(url, fb);
}

export const xhm = gifPostApi;
export const postError = function(option: object){
    gifPostApi(option,"er");   
}
