export declare function pushErrorInfo(e?: Error, str?: string, option?: {
    line?: number;
    col?: number;
    other?: string;
}): void;
export declare function initErrorPost(): void;
export interface ErrorInfo {
    data: ErrorData;
    length: number;
    times: number[];
}
export interface ErrorData {
    name: string;
    message: string;
    stack: string;
    errStr: string;
    errorType: string;
    time: number;
}
