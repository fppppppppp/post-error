import { setConfig, getSystem } from "./config/global-config";
import { xhm } from "./service/xhm";
import { setUser } from "./userinfo/index";
import { initEvent } from "./bindEvent/index";
import { initPostError } from "./service/index";
/**
 * 配置系统参数
 * 配置的同时绑定自定义事件
 *
 */
const config = function (option) {
    setConfig(option);
    initEvent();
    initPostError();
};
const setUserId = function (id) {
    setUser(id);
    let sys = getSystem();
    xhm(sys, "ch");
};
export { config, setUserId };
//# sourceMappingURL=index.js.map