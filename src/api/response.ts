import {AxiosRequestConfig, AxiosResponse} from "axios";


export type RequestConfig  = AxiosRequestConfig;

export type Response<T> = {
    data: T;
    headers: object;
    request?: any;
    config: RequestConfig;
}
