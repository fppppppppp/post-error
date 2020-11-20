

import {setConfig , getSystem ,ConfigOption} from "./config/global-config";
import {xhm} from "./service/xhm";
import { setUser , getUserInfo ,initUserInfo} from "./userinfo/index";
import { initEvent } from "./bindEvent/index";
import {initPostError}  from "./service/index";


export { bindPlugin, getPlugin , pluginReact}  from "./createPlugin";
/**
 * 配置系统参数
 * 配置的同时绑定自定义事件
 * 
 */
const config = function(option: ConfigOption){
    setConfig(option);
    initEvent();
    initPostError();
}
const  setUserId = function(id: string,info?: any){
    let sys: any = getSystem();
    const userInfo = getUserInfo();
    if(!userInfo.userid){
        setUser(id);
    }else{
        const _ouu = userInfo.uid;
        initUserInfo();
        sys = {
            ...sys,
            _ouu
        }
    }
    if(info){
        sys.info = info;
    }
    xhm(sys,"ch");
}

export {config,setUserId};


