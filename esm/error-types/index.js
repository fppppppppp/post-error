class CustomError extends Error {
    constructor(message, type) {
        super();
        this.message = message;
        this.name = type;
    }
}
class NetworkRequestError extends CustomError {
    constructor(message, type) {
        super(message, type);
        this._errorName = "NetworkRequestError";
    }
}
class UnkownError extends CustomError {
    constructor(message, type) {
        super(message, type);
        this._errorName = "UnkownError";
    }
}
class UnhandledrejectionNotObjectError extends CustomError {
    constructor(message, type) {
        super(message, type);
        this._errorName = "UnhandledrejectionNotObjectError";
    }
}
export { NetworkRequestError, UnkownError, UnhandledrejectionNotObjectError };
//# sourceMappingURL=index.js.map