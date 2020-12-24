import { uuid, uuid4 } from "../utils/create-uid";
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
let userInfo = {
    clientType: "1",
};
/**
 * 初始化用户个人信息
 */
export function initUserInfo() {
    const postUuid = getLocalStorage("__posterror__uuid");
    if (postUuid) {
        userInfo.uuid = postUuid;
    }
    else {
        const id = uuid();
        userInfo.uuid = id;
        setLocalStorage("__posterror__uuid", id);
    }
    const uid = uuid4();
    userInfo.uid = uid;
}
/**
 * 获取用户个人信息
 */
export function getUserInfo() {
    if (!userInfo.uid) {
        initUserInfo();
    }
    return userInfo;
}
/**
 *
 * 设置用户个人信息
 */
export function setSystemUser(id) {
    userInfo.userid = id;
}
export function setUser(id) {
    userInfo.userid = id;
}
export function setClientType(id) {
    userInfo.clientType = id;
}
export function setProject(id) {
    userInfo.projectInfo = id;
}
//# sourceMappingURL=index.js.map