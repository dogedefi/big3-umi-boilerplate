import AbortController from 'abort-controller';
import { request } from 'umi';
import { message } from 'antd';

export const AbortControllerFactory = {
    create() {
        return new AbortController();
    },
};

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface FusibleRequest {
    url: string;
    method?: RequestMethod;
    data?: any;
    headers?: HeadersInit;
    requestType?: 'json' | 'form';
    dialog?: boolean;
    abortSignal?: AbortSignal;
}

export interface FusibleResponse<T> {
    code: number;
    message: string | null;
    data: T;
}

export interface FusibleError {
    code: number;
    message: string | null;
}

export async function fusibleRequest<T>(props: FusibleRequest): Promise<FusibleResponse<T>> {
    try {
        const { url, method = 'GET', data = {}, headers, requestType, dialog = false, abortSignal } = props;
        const _headers = { ...headers };
        const result = await request(url, {
            signal: abortSignal,
            errorHandler: null,
            method,
            requestType,
            headers: _headers,
            ...(method === 'GET' ? { params: data } : { data }),
            withCredentials: true,
        });
        if (result.code > 0) {
            dialog && message.error({ content: result.message });
            return Promise.reject(result);
        }
        return result;
    } catch (error: any) {
        return Promise.reject(error.data);
    }
}
