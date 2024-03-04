import axios, { AxiosError, Method } from "axios";
// types
import { RequestOptions, ResponseModel } from "src/types/api";

const HOST = process.env.REACT_APP_BASEURL!;

export default class ApiSlice {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  static defaultAuth = false;
  static baseUrl = HOST;

  static async request<T = unknown>(
    url = "",
    method: Method = "GET",
    payload: Record<string, unknown> | FormData | null = null,
    options: RequestOptions = null
  ): Promise<ResponseModel<T>> {
    let headers: { Authorization?: string } = {};

    if (this.defaultAuth || options?.auth) {
      headers.Authorization = `Bearer ${localStorage.getItem("token") || process.env.TEST_TOKEN}`; // for most of requests;
    }

    if (options?.headers) headers = { ...headers, ...options.headers };

    try {
      const rsp =
        (await axios({
          method,
          url: this.baseUrl + url,
          headers,
          data: payload || {},
          responseType: "json"
        })) || {};

      return rsp.data;
    } catch (err) {
      return (err as AxiosError<ResponseModel<T>>).response!.data;
    }
  }
}
