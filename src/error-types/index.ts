
class CustomError extends Error {
  constructor(message: string,type: string){
    super();
    this.message = message;
    this.name = type;
  }
}

class NetworkRequestError extends CustomError {
  _errorName = "NetworkRequestError"
  constructor(message: string,type: string){
    super(message,type);
  }
}
class UnkownError extends CustomError {
  _errorName = "UnkownError"
  constructor(message: string,type: string){
    super(message,type);

  }
}
class UnhandledrejectionNotObjectError extends CustomError {
  _errorName = "UnhandledrejectionNotObjectError"
  constructor(message: string,type: string){
    super(message,type);
  }
}


export {
  NetworkRequestError,
  UnkownError,
  UnhandledrejectionNotObjectError
}