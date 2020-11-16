import { uuid } from "../utils/create-uid";
export interface UserInfo {
  uid?: string;
  projectInfo?: string;
  userid?: string;
  clientType?: "1" | "2" | "3";
}

let userInfo: UserInfo = {
  clientType: "1",
};

/**
 * 初始化用户个人信息
 */
function initUserInfo(): void {
  const uid = uuid();
  userInfo.uid = uid;
}

/**
 * 获取用户个人信息
 */
export function getUserInfo(): UserInfo {
  if (!userInfo.uid) {
    initUserInfo();
  }
  return userInfo; 
}
/**
 *
 * 设置用户个人信息
 */

export function setSystemUser(id: string): void {
  userInfo.userid = id;
}

export function setUser(id: string): void {
  userInfo.userid = id;
}

export function setClientType(id: "1" | "2" | "3"): void {
  userInfo.clientType = id;
}
export function setProject(id: string): void {
  userInfo.projectInfo = id;
}

