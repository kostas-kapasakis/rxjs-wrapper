import {Observable} from 'rxjs';
import {AxiosPromise, AxiosResponse} from 'axios';
import initializeAxios from './axiosSetup';
import {axiosRequestConfiguration} from './config';
import HTTPMethod from 'http-method-enum';
import {fromPromise} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";


const axiosInstance = initializeAxios(axiosRequestConfiguration);

const request = <T>(method: HTTPMethod, url: string, queryParams?: object, body?: object): Observable<T> => {
    let request: AxiosPromise<T>;
    switch (method) {
        case HTTPMethod.GET:
            request = axiosInstance.get<T>(url, {params: queryParams});
            break;
        case HTTPMethod.POST:
            request = axiosInstance.post<T>(url, body, {params: queryParams});
            break;
        case HTTPMethod.PUT:
            request = axiosInstance.put<T>(url, body, {params: queryParams});
            break;
        case HTTPMethod.PATCH:
            request = axiosInstance.patch<T>(url, body, {params: queryParams});
            break;
        case HTTPMethod.DELETE:
            request = axiosInstance.delete(url, {params: queryParams});
            break;

        default:
            throw new Error('Method not supported');
    }

    return fromPromise<AxiosResponse<T>>( request ).pipe(map(result => result.data));
};

const get = <T>(url: string, queryParams?: object):Observable<T> => {
    return request<T>(HTTPMethod.GET, url, queryParams);
};

const post = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
    return request<T>(HTTPMethod.POST, url, queryParams, body);
};

const put = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
    return request<T>(HTTPMethod.PUT, url, queryParams, body);
};

const patch = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
    return request<T>(HTTPMethod.PATCH, url, queryParams, body);
};

const deleteR = <T>(url:string , queryParams?:object): Observable<T | void> => {
    return request<T>(HTTPMethod.DELETE, url, queryParams);
};

export default  { request, get, post, put, patch, deleteR } ;
