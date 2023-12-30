export type ResponseInterceptor = (response: Response) => Promise<Response>;
export type ErrorInterceptor = (error: Error) => void;

type RequestInterceptor = (
  url: string,
  options: object
) => {
  interceptedUrl: string;
  interceptedOptions: object;
};

export interface RegisterInterceptorsType {
  request?: RequestInterceptor;
  response?: ResponseInterceptor;
  responseError?: ErrorInterceptor;
}

interface RequestError {
  errorMessage: string;
}

export interface BadRequestError extends RequestError {}
export interface UnauthorizedError extends RequestError {}
