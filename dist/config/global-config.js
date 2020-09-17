import { servicePath } from "./config";
import { setProject, setSystemUser, setClientType } from "../userinfo/index";
import { getSystemInfo } from "../utils/os-browser";
import { xhm } from '../service/xhm';
const defaultConfig = {
    url: servicePath,
    delay: 1000,
    mergeReport: true,
    random: 1,
    repeat: 20
};
export function setConfig(option) {
    Object.assign(defaultConfig, option);
    const { projectId, userId, clientType } = defaultConfig;
    if (projectId) {
        setProject(projectId);
    }
    if (userId) {
        setSystemUser(userId);
    }
    if (clientType) {
        setClientType(clientType);
    }
    if (clientType) {
        defaultConfig.clientType = clientType;
    }
    xhm(getSystem(), "lo");
}
export function getSystem() {
    const postInfo = {
        inf: {
            os: getSystemInfo()
        }
    };
    return postInfo;
}
export function getConfig() {
    return defaultConfig;
}
//# sourceMappingURL=global-config.js.map