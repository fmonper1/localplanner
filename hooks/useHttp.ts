import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const request = async (config: AxiosRequestConfig) => {
  config.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...config.headers,
  };
  return Axios(config);
};

const URL_BASE = "http://51.178.46.227:1337/";

const useRequest = {
  get: async (url: string, config?: AxiosRequestConfig) =>
    request({
      method: "get",
      url,
      ...config,
    }),

  put: async (
    url: string,
    data: AxiosRequestConfig["data"],
    config?: AxiosRequestConfig
  ) =>
    request({
      method: "put",
      url,
      data,
      ...config,
    }),

  post: async (
    url: string,
    data: AxiosRequestConfig["data"],
    config?: AxiosRequestConfig
  ) =>
    request({
      method: "post",
      url,
      data,
      ...config,
    }),

  patch: async (
    url: string,
    data: AxiosRequestConfig["data"],
    config?: AxiosRequestConfig
  ) =>
    request({
      method: "patch",
      url,
      data,
      ...config,
    }),

  delete: async (url: string, config?: AxiosRequestConfig) =>
    request({
      method: "delete",
      url,
      ...config,
    }),
};

export const useHttp = {
  get: <T = unknown, E = Error>(url: string) =>
    useRequest.get(`${URL_BASE}${url}`) as unknown as Promise<
      AxiosResponse<T, E>
    >,
};
