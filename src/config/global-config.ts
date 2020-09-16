
import { servicePath } from "./config";
import { setProject,setSystemUser,getUserInfo, UserInfo ,setClientType} from "../userinfo/index";
import { getSystemInfo } from "../utils/os-browser";
import { xhm } from '../service/xhm';
const  defaultConfig: ConfigOption = {
    url: servicePath,
    delay : 1000,
    mergeReport : true,
    random: 1,
    repeat:20,
}

export  function setConfig(option: ConfigOption): void{
    Object.assign(defaultConfig,option);
    const {projectId, userId, clientType} = defaultConfig;
    if(projectId){
        setProject(projectId);
    }
    if(userId){
        setSystemUser(userId);
    }
    if(clientType){
        setClientType(clientType)
    }
    if(clientType){
        defaultConfig.clientType = clientType;
    }
    xhm(getSystem(),"lo")
} 

export function getSystem(): SystemInfo{

    const postInfo: SystemInfo = {
        inf:{
            os:getSystemInfo()
        }
    }
    return postInfo;
}
export function getConfig(): ConfigOption{
    return defaultConfig ;
}
export interface SystemInfo{
    _uu?: string;
    _ct?: string;
    inf?: any;
    _uid?: string;
}
export interface ConfigOption{
    url?:string;   // 上报的地址
    delay?:number; // 上报的时间间隔
    mergeReport ?: boolean ; // 是否合并上报
    random?: number;  // 抽样上报   （基于 Math.random）
    repeat?: number;  // 重复多少次 不上报;
    projectId?: string; // 项目id 
    clientType?: "1"|"2"|"3",
    userId? :string ; // 用户id // 支持后续配置
}