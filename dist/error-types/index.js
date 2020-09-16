class CustomError extends Error {
    constructor(message, type) {
        super();
        this.message = message;
        this.name = type;
    }
}
class NetworkRequestError extends CustomError {
}
class UnkownError extends CustomError {
}
class UnhandledrejectionNotObjectError extends CustomError {
}
export { NetworkRequestError, UnkownError, UnhandledrejectionNotObjectError };
//# sourceMappingURL=index.js.map