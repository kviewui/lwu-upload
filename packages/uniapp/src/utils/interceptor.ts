import type { Config, UploadParams } from '../types';
import { loading } from '../utils';

export function useInterceptor(chain: any, params: UploadParams, config: Config) {
    const invoke = (params: UploadParams) => {
        if (config.debug) {
            console.warn(`【LwuUploader Debug:请求拦截】${JSON.stringify(config)}`);
        }

        if (config.loading) {
            loading({ title: config.loadingText ?? '上传中...' });
        }

        // 拼接baseURI
        let baseURI = '';
        if (process.env.NODE_ENV !== 'development') {
            baseURI = config.baseURI.dev;
        } else {
            baseURI = config.baseURI.pro;
        }

        let options = {
            ...config,
            ...params
        };

        let reqUrl = `${baseURI}${params.url}`;

        options.url = reqUrl;

        // 请求前自定义拦截
        params.before && params.before(options);

        return chain.request(options);
    }

    const success = (response: UniApp.UploadFileSuccessCallbackResult) => {
        if (config.debug) {
            console.warn(`【LwuUploader Debug:响应拦截】${JSON.stringify(response)}`);
        }

        params.after && params.after(response);

        return response;
    }

    const fail = (err: UniApp.GeneralCallbackResult) => {
        if (config.debug) {
            console.warn(`【LwuUploader Debug:请求拦截失败】${JSON.stringify(err)}`);
        }

        return err;
    }

    const complete = (res: UniApp.GeneralCallbackResult) => {
        uni.hideLoading();
        if (config.debug) {
            console.warn(`【LwuUploader Debug:请求拦截完成】${JSON.stringify(res)}`);
        }
    }

    return {
        request: invoke,
        response: success,
        fail: fail,
        complete: complete
    }
}