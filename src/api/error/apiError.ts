export class ApiError extends Error {
  funcName: string;

  constructor(message: string, funcName: string) {
    super(message);
    this.funcName = funcName;
  }
}