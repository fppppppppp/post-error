import { ConfigOption } from "./config/global-config";
import { postRouter } from "./bindEvent/bind-route";
import { track as postClick } from "./bindEvent/bind-track";
export { bindPlugin, getPlugin, pluginReact } from "./createPlugin";
/**
 * 配置系统参数
 * 配置的同时绑定自定义事件
 *
 */
declare const config: (option: ConfigOption) => void;
declare const setUserId: (id: string, info?: any) => void;
declare const handTrack: HandTrack;
export { config, setUserId, handTrack };
export interface HandTrack {
    postRouter: postRouter;
    postClick: postClick;
}
interface postRouter {
    (form: string, to: string): void;
}
interface postClick {
    (e: HTMLElement): void;
}
