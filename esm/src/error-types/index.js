class CustomError extends Error {
    constructor(message, type) {
        super();
        this.message = message;
        this.name = type;
        this.stack = (new Error()).stack;
    }
}
class NetworkRequestError extends CustomError {
    constructor(message, type = "NetworkRequestError") {
        super(message, type);
        this._errorName = "NetworkRequestError";
    }
}
class UnkownError extends CustomError {
    constructor(message, type = "UnkownError") {
        super(message, type);
        this._errorName = "UnkownError";
    }
}
class UnhandledrejectionNotObjectError extends CustomError {
    constructor(message, type = "UnhandledrejectionNotObjectError") {
        super(message, type);
        this._errorName = "UnhandledrejectionNotObjectError";
    }
}
class XHMHttpResponseError extends CustomError {
    constructor(message, type = "XHMHttpResponseError") {
        super(message, type);
        this._errorName = "XHMHttpResponseError";
    }
}
class XHMHttpError extends CustomError {
    constructor(message, type = "XHMHttpError") {
        super(message, type);
        this._errorName = "XHMHttpError";
    }
}
export { NetworkRequestError, UnkownError, UnhandledrejectionNotObjectError, XHMHttpResponseError, XHMHttpError };
//# sourceMappingURL=index.js.map