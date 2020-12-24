
import { servicePath } from "./config";
import { setProject, setSystemUser, getUserInfo, UserInfo, setClientType } from "../userinfo/index";
import { getSystemInfo } from "../utils/os-browser";
import { trigger } from "../utils/obersve";
const defaultConfig: any = {
    url: servicePath,
    delay: 1000,
    mergeReport: true,
    random: 1,
    repeat: 20,
    debug: false,
    autoTrack: false,
    notTrackClass: ['mp-no-track'],
    autoTrackTag: ["input","button","a"]
}
export interface ConfigOption {
    url?: string;   // 上报的地址
    delay?: number; // 上报的时间间隔
    mergeReport?: boolean; // 是否合并上报
    random?: number;  // 抽样上报   （基于 Math.random）
    repeat?: number;  // 重复多少次 不上报;
    projectId?: string; // 项目id 
    clientType?: "1" | "2" | "3",
    userId?: string; // 用户id // 支持后续配置
    debug?: boolean;  // 是否开启debug 模式
    autoTrack?: boolean; // 是否全埋点
    notTrackClass?: string[]; // 不走全埋点的样式
    autoTrackTag?: string[]; // 全埋点的标签
    onXMLResponsePostError?: (xhrInstanceStatusText: string, xhm: XMLHttpRequest) => boolean; // 如果存在该函数 并且还会true  会上报数据 主要用于项目自定义是否成功字段。
}

export function setConfig(option: any): void {
    Object.assign(defaultConfig, option);
    const { projectId, userId, clientType, url } = defaultConfig;
    if (projectId) {
        setProject(projectId);
    }
    if (userId) {
        setSystemUser(userId);
    }
    if (clientType) {
        setClientType(clientType);
    }
    if (url) {
        trigger("changeUrl", url);
    }
    if (clientType) {
        defaultConfig.clientType = clientType;
    }
}

export function getSystem(): SystemInfo {

    const postInfo: SystemInfo = {
        inf: {
            os: getSystemInfo()
        }
    }
    return postInfo;
}
export function getConfig(): ConfigOption {
    return defaultConfig;
}
export interface SystemInfo {
    _uu?: string;
    _ct?: string;
    inf?: any;
    _uid?: string;
}
