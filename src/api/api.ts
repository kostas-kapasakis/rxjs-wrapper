import {from, Observable} from 'rxjs';
import {AxiosPromise, AxiosResponse} from 'axios';
import initializeAxios from './axiosSetup';
import {axiosRequestConfiguration} from './config';
import HTTPMethod from 'http-method-enum';
import {map, tap} from "rxjs/operators";
import {Response} from "./response";

const axiosInstance = initializeAxios(axiosRequestConfiguration);

const requestParser = <T>(method: HTTPMethod, url: string, queryParams?: object, body?: object): Observable<Response<T>> => {
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

    return from( request ).pipe(tap(result => { }
        //             data: result.data,
        //             request: result.request ,
        //             headers: result.headers ,
        //             config:result.config
        // }
                    ));
};

const get = <T>(url: string, queryParams?: object):Observable<T> => {
    return requestParser<T>(HTTPMethod.GET, url, queryParams);
};

const post = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
    return requestParser<T>(HTTPMethod.POST, url, queryParams, body);
};

const put = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
    return requestParser<T>(HTTPMethod.PUT, url, queryParams, body);
};

const patch = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
    return requestParser<T>(HTTPMethod.PATCH, url, queryParams, body);
};

const remove = <T>(url:string , queryParams?:object): Observable<T | void> => {
    return requestParser<T>(HTTPMethod.DELETE, url, queryParams);
};

export default  { requestParser, get, post, put, patch, remove } ;
