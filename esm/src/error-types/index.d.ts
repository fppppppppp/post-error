declare class CustomError extends Error {
    constructor(message: string, type?: string);
}
declare class NetworkRequestError extends CustomError {
    _errorName: string;
    constructor(message: string, type?: string);
}
declare class UnkownError extends CustomError {
    _errorName: string;
    constructor(message: string, type?: string);
}
declare class UnhandledrejectionNotObjectError extends CustomError {
    _errorName: string;
    constructor(message: string, type?: string);
}
declare class XHMHttpResponseError extends CustomError {
    _errorName: string;
    constructor(message: string, type?: string);
}
declare class XHMHttpError extends CustomError {
    _errorName: string;
    constructor(message: string, type?: string);
}
export { NetworkRequestError, UnkownError, UnhandledrejectionNotObjectError, XHMHttpResponseError, XHMHttpError };
