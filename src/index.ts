

import { setConfig, getSystem, ConfigOption } from "./config/global-config";
import { xhm } from "./service/xhm";
import { setUser, getUserInfo, initUserInfo } from "./userinfo/index";
import { initEvent } from "./bindEvent/index";
import { initPostError } from "./service/index";
import { postRouter } from "./bindEvent/bind-route";
import { track as postClick } from "./bindEvent/bind-track";
export { bindPlugin, getPlugin, pluginReact } from "./createPlugin";


/**
 * 配置系统参数
 * 配置的同时绑定自定义事件
 * 
 */
const config = function (option: ConfigOption) {
    setConfig(option);
    xhm(getSystem(), "lo")
    initEvent();
    initPostError();
}
const setUserId = function (id: string, info?: any) {
    let sys: any = getSystem();
    const userInfo = getUserInfo();
    if (!userInfo.userid) {
        setUser(id);
    } else {
        const _ouu = userInfo.uid;
        initUserInfo();
        sys = {
            ...sys,
            _ouu
        }
    }
    if (info) {
        sys.info = info;
    }
    // fix: 配置userid  不在上传基本信息
    delete sys.inf;
    xhm(sys, "ch");
}
const handTrack: HandTrack = {
    postRouter,
    postClick
}


export { config, setUserId, handTrack };


export interface HandTrack {
    postRouter: postRouter;
    postClick: postClick
}

interface postRouter {
    (form: string, to: string): void
}
interface postClick {
    (e: HTMLElement): void
}