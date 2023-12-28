export type RequestInterceptor = (
  url: string,
  options: object
) => {
  interceptedUrl: string;
  interceptedOptions: object;
};
export type ResponseInterceptor = (response: Response) => Promise<Response>;
export type ErrorInterceptor = (error: Error) => void;

export interface BadRequestError {
  errorMessage: string;
}
