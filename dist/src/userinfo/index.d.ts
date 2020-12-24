export interface UserInfo {
    uuid?: string;
    uid?: string;
    projectInfo?: string;
    userid?: string;
    clientType?: "1" | "2" | "3";
}
/**
 * 初始化用户个人信息
 */
export declare function initUserInfo(): void;
/**
 * 获取用户个人信息
 */
export declare function getUserInfo(): UserInfo;
/**
 *
 * 设置用户个人信息
 */
export declare function setSystemUser(id: string): void;
export declare function setUser(id: string): void;
export declare function setClientType(id: "1" | "2" | "3"): void;
export declare function setProject(id: string): void;
