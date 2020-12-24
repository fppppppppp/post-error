
import { servicePath } from "../config/config";
import { getUserInfo, UserInfo } from "../userinfo/index";
import { listen } from "../utils/obersve";
import { version } from '../../package.json';
import { ajax } from "../utils/ajax";
import { getConfig } from "@/config/global-config";
export interface PostDataInfo {
    _uu: string;
    _ct: string;
    _p: string;
    _uid?: string;
    _fm: string;
    _v: string;
    _u: string;
    _tm: number;
    _tit: string;
}

let serviceUrl = servicePath;
listen("changeUrl", (path) => {
    serviceUrl = path;
})


const gifPostApi = function (url) {
    const gif = document.createElement("img");
    // const postOption = createUrl({...option,_te:type});
    const path = serviceUrl + "pr/e.gif?" + url;
    gif.src = path;
};

const postApi = function (option: object, type: XhmType = "er") {
    const debug = getConfig().debug;
    const gifUrl = createUrl({ ...option, _te: type });
    // 如果浏览器支持sendBeacon 优先使用 
    if(navigator && navigator.sendBeacon){
        const bobl = getSendBeaconInfo(gifUrl);
        navigator.sendBeacon(serviceUrl +'pr/',bobl)
    }else{
    // 降级 如果内容大于5000条 用post  否则采用图片上传
        
        if (gifUrl.length > 5000) {
            ajax({
                url: serviceUrl+'pr/',
                type: "POST",
                data: getPostOption({ ...option, _te: type })
            });
        } else {
            gifPostApi(gifUrl)
        }
    }
    if(debug){
        console.log(`发送了一次请求，类型为${getTypeName(type)}; 参数为`,getPostOption({ ...option, _te: type }));
    }
}

function getPostInfo(): PostDataInfo {
    let userinfo: UserInfo = getUserInfo();
    const { userid, uid, projectInfo, clientType ,uuid } = userinfo;
    const { href } = window.location;
    let option: PostDataInfo = {
        "_u":uuid,
        '_uu': uid,
        '_ct': clientType,
        '_p': projectInfo,
        '_fm': href,
        '_v': version,
        '_tm': performance?performance.now():0,
        _tit: document.title
    }
    if (userid) {
        option._uid = userid;
    }
    return option;
}
function getPostOption(info) {
    const deInfo = getPostInfo();
    const op: any = { ...info, ...deInfo }
    for (let i in op) {
        let value = op[i];
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        op[i] = value;
    }
    // arr.push("_t="+  +new Date())
    op._t = +new Date();
    return op;
}

function createUrl(info) {
    const opt = getPostOption(info);
    let arr = [];
    for (let i in opt) {
        arr.push(`${i}=${encodeURIComponent(opt[i])}`)
    }
    return arr.join("&");
}


function getSendBeaconInfo(url): Blob {
	const blob = new Blob([url], {type : 'application/x-www-form-urlencoded'});
	return blob;
}

export const xhm = postApi;
export const postError = function (option: object) {
    postApi(option, "er");
}


function getTypeName(type){
    switch(type){
        case "lo":
            return "登录"
        case "er":
            return "异常"
        case "ex":
            return "退出"
        case "ch":
            return "修改用户数据"
        case "pe":
            return "上传页面性能"
        case "cl":
            return "页面点击事件"
        case "ro":
            return "路由切换"
    }
}

// 登录 异常 退出 修改 性能 点击 路由
export type XhmType = 'lo' | 'er' | 'ex' | 'ch' | 'pe' | 'cl' | 'ro';