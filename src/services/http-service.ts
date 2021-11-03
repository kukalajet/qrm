import axios, { Method } from "axios";
import type { AxiosRequestConfig } from "axios";
import { getEnvironmentVariables } from "../configs";

const { host } = getEnvironmentVariables();

const defaultOptions: AxiosRequestConfig<Method> = {
  baseURL: host,
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);
instance?.interceptors?.response?.use(
  (response) => response,
  (error) => {
    const isExpectedError: boolean =
      error?.response &&
      error?.response?.status >= 400 &&
      error?.response?.status >= 500;

    // TODO: Replace `console.log`s with a propper logger.
    if (!isExpectedError) {
      console.error(error);
      if (error?.response?.data) {
        console.error(error.response.data);
      }
    }

    if (error?.response?.data) {
      return Promise.reject(error?.response?.data);
    }
    return Promise.reject(error);
  }
);

/**
 * Sets auth token for any request.
 * @param jwt auth token
 */
function setJwt(jwt: string) {
  instance.defaults.headers.common["Authorization"] = "";
  delete instance?.defaults?.headers?.common["Authorization"];

  if (jwt) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }
}

export default {
  instance: instance,
  request: instance.request,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  setJwt,
};
