import { AlertVariant } from "./../components/common/alert-modal/alert-modal.view";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "@/core/constants/config";
import store from "../redux";
import { setToken } from "@/modules/auth/presentation/redux";

export type ResponseDialog = {
  title?: string;
  description: string;
  variant?: AlertVariant;
  actions: {
    name: string;
    action: string;
    style?: "solid" | "outline";
  }[];
};
export type ResponseError<T = any> = {
  errorCode: number;
  message: string;
  validationErrors: { [key in keyof T]: string } | null;
  dialog?: ResponseDialog;
};
type ResponseType<D, T = any> =
  | {
      apiVersion: number;
      success: false;
      result: null;
      error: ResponseError<T> | null;
      message: string;
    }
  | {
      apiVersion: number;
      success: true;
      result: D;
      error: null;
      message: string;
    };

class Http {
  private apiUrl = BASE_URL + "/api/v1";

  private createUrl(url: string) {
    if (url[0] !== "/") return url;
    return this.apiUrl + url;
  }

  private getConfig(config: AxiosRequestConfig = {}): AxiosRequestConfig {
    const { token, deviceId } = store.getState().auth;

    const _config = {
      ...config,
      headers: {
        ...config?.headers,
      },
    };
    if (token && !_config.headers.Authorization) {
      _config.headers.Authorization = "Bearer " + token;
    }
    if (deviceId) _config.headers["X-Device-Detail"] = deviceId;
    return _config;
  }
  private errorHandler(resolve: (value: ResponseType<any>) => void) {
    return (e: any) => {
      const { apiVersion, error, message } = e?.response?.data || {};

      if (e?.Response?.status < 600 && e?.Response?.status >= 500) {
        resolve({
          apiVersion: 0,
          success: false,
          result: null,
          error: { message: "خطا در ارتباط با سرور" },
          message: "",
        } as ResponseType<null>);
        return;
      }
      if (e?.response?.status === 401) {
        if (store) store.dispatch(setToken(""));
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      resolve({
        apiVersion: apiVersion || 0,
        success: false,
        result: null,
        error: error || e,
        message: message || "",
      } as ResponseType<null>);
    };
  }
  private responseHandler<T>(resolve: (value: ResponseType<any>) => void) {
    return (res: AxiosResponse<ResponseType<T, any>>) => {
      resolve(res.data);
    };
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseType<T>> {
    return new Promise((resolve) =>
      axios
        .get<ResponseType<T>>(this.createUrl(url), this.getConfig(config))
        .then(this.responseHandler(resolve))
        .catch(this.errorHandler(resolve))
    );
  }
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseType<T>> {
    return new Promise((resolve) =>
      axios
        .delete<ResponseType<T>>(this.createUrl(url), this.getConfig(config))
        .then(this.responseHandler(resolve))
        .catch(this.errorHandler(resolve))
    );
  }
  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ResponseType<T>> {
    return new Promise((resolve) => {
      axios
        .post<D, AxiosResponse<ResponseType<T, D>>>(
          this.createUrl(url),
          data,
          this.getConfig(config)
        )
        .then(this.responseHandler(resolve))
        .catch(this.errorHandler(resolve));
    });
  }
  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ResponseType<T>> {
    return new Promise((resolve) => {
      axios
        .put<D, AxiosResponse<ResponseType<T, D>>>(
          this.createUrl(url),
          data,
          this.getConfig(config)
        )
        .then(this.responseHandler(resolve))
        .catch(this.errorHandler(resolve));
    });
  }
}

const http = new Http();

export default http;
