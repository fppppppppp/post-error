import { uuid } from "../utils/create-uid";
let userInfo = {
    clientType: "1",
};
/**
 * 初始化用户个人信息
 */
export function initUserInfo() {
    const uid = uuid();
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