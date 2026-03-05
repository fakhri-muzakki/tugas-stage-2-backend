export class AppError extends Error {
  statusCode: number;
  domainError?: string;

  constructor(message: string, statusCode: number, domainError?: string) {
    super(message);
    this.statusCode = statusCode;
    this.domainError = domainError;
    this.name = 'AppError';
  }
}
