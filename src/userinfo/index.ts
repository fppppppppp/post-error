import { uuid ,uuid4} from "../utils/create-uid";
import { setLocalStorage, getLocalStorage  } from "../utils/localStorage";

export interface UserInfo {
  uuid?: string;  // 唯一id
  uid?: string;   // 动态id
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
export function initUserInfo(): void {
  const postUuid = getLocalStorage("__posterror__uuid");
  if(postUuid){
    userInfo.uuid = postUuid;
  }else{
    const id =uuid(); 
    userInfo.uuid = id
    setLocalStorage("__posterror__uuid",id);
  }
  const uid = uuid4();
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

