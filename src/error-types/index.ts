
class CustomError extends Error {
  constructor(message: string,type?: string){
    super();
    this.message = message;
    this.name = type;
    // this.stack = (new Error()).stack;
  }
}

class NetworkRequestError extends CustomError {
  _errorName = "NetworkRequestError";
  constructor(message: string,type: string = "NetworkRequestError"){
    super(message,type);
  }
}
class UnkownError extends CustomError {
  _errorName = "UnkownError"

  constructor(message: string,type: string = "UnkownError"){
    super(message,type);

  }
}
class UnhandledrejectionNotObjectError extends CustomError {
  _errorName = "UnhandledrejectionNotObjectError"

  constructor(message: string,type: string = "UnhandledrejectionNotObjectError"){
    super(message,type);
  }
}

class XHMHttpResponseError extends CustomError {
  _errorName = "XHMHttpResponseError"

  constructor(message: string,type: string = "XHMHttpResponseError"){
    super(message,type);
  }
}
class XHMHttpError extends CustomError {
  _errorName = "XHMHttpError"
  constructor(message: string,type: string = "XHMHttpError"){
    super(message,type);
  }
}



export {
  NetworkRequestError,
  UnkownError,
  UnhandledrejectionNotObjectError,
  XHMHttpResponseError,
  XHMHttpError
}