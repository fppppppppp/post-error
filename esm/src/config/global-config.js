import { servicePath } from "./config";
import { setProject, setSystemUser, setClientType } from "../userinfo/index";
import { getSystemInfo } from "../utils/os-browser";
import { trigger } from "../utils/obersve";
const defaultConfig = {
    url: servicePath,
    delay: 1000,
    mergeReport: true,
    random: 1,
    repeat: 20,
    debug: false,
    autoTrack: false,
    notTrackClass: ['mp-no-track'],
    autoTrackTag: ["input", "button", "a"]
};
export function setConfig(option) {
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