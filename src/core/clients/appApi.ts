import type {
  UnauthorizedError,
  BadRequestError,
  ResponseInterceptor,
  ErrorInterceptor,
  RegisterInterceptorsType,
} from "./types";

const createClient = (baseUrl: string, api = fetch) => {
  let interceptRequest = (url: string, options: object) => {
    return { interceptedUrl: url, interceptedOptions: options };
  };
  let interceptResponse: ResponseInterceptor = async (response: Response) =>
    response;
  let interceptError: ErrorInterceptor = (error: Error) => {};

  return {
    get: async (url: string, options: object = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(
          url,
          options
        );
        let response = await api(baseUrl + interceptedUrl, interceptedOptions);
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        }
        throw exception;
      }
    },
    post: async (url: string, values: object, options: object = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(
          url,
          options
        );
        let response = await api(baseUrl + interceptedUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        }
        throw exception;
      }
    },
    put: async (url: string, values: object, options: object = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(
          url,
          options
        );
        let response = await api(baseUrl + interceptedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        } else {
          throw exception;
        }
      }
    },
    delete: async (url: string, options: object = {}) => {
      try {
        const { interceptedUrl, interceptedOptions } = interceptRequest(
          url,
          options
        );
        let response = await api(baseUrl + interceptedUrl, {
          method: "DELETE",
          ...interceptedOptions,
        });
        return await interceptResponse(response);
      } catch (exception) {
        if (exception instanceof Error) {
          interceptError(exception);
        } else throw exception;
      }
    },
    registerInterceptors: ({
      request,
      response,
      responseError,
    }: RegisterInterceptorsType) => {
      if (!!request) interceptRequest = request;
      if (!!response) interceptResponse = response;
      if (!!responseError) interceptError = responseError;
    },
  };
};

const apiUrl = process.env.REACT_APP_SERVER_URL;
if (!apiUrl) {
  throw new Error("apiUrl environment variable not set");
}
const appApi = createClient(apiUrl, fetch);

appApi.registerInterceptors({
  response: async (response: Response) => {
    if (isInternalServerError(response.status)) {
      window.location.assign("/error/500");
    }
    if (isForbidden(response.status)) {
      window.location.assign("/login");
    }
    if (isBadRequest(response.status)) {
      const exceptionData: BadRequestError = await response.json();
      throw exceptionData;
    }
    if (isUnauthorized(response.status)) {
      const exceptionData: UnauthorizedError = await response.json();
      throw exceptionData;
    }
    if (isOtherError(response.status)) {
      throw "Other error: " + response.statusText;
    }
    return response;
  },
  responseError: (error: Error) => {
    window.location.assign("/error/500");
  },
});

const isInternalServerError = (statusCode: number) => {
  return statusCode === 500;
};

const isForbidden = (statusCode: number) => {
  return statusCode === 403;
};

const isBadRequest = (statusCode: number) => {
  return statusCode === 400;
};
const isUnauthorized = (statusCode: number) => {
  return statusCode === 401;
};

const isOtherError = (statusCode: number) => {
  return statusCode >= 400;
};

export { appApi };
