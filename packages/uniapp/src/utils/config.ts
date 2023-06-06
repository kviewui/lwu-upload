import type { Config } from '../types';

export const useConfig = (config: Config) => {
    return {
        baseURI: config.baseURI,
        /**
         * 调试模式，开启后控制台会显示内部调试打印信息
         */
        debug: config.debug ?? false,
        /**
         * 请求过程是否显示loading
         */
        loading: config.loading ?? true,
        /**
         * 请求中loading弹窗的提示文本，默认为 `'上传中...'`
         */
        loadingText: config.loadingText ?? '上传中...',
        /**
         * 自定义请求前拦截
         */
        before: config.before,
        /**
         * 自定义请求后拦截
         */
        after: config.after,
        /**
         * 自定义请求头信息
         */
        header: config.header ?? {},
        /**
         * 请求超时时间，单位ms
         */
        timeout: config.timeout ?? 60000,
        /**
         * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容，默认为 `file`
         */
        name: config.name ?? 'file',
        /**
         * HTTP 请求中其他额外的 form data
         */
        formData: config.formData ?? {},
        /**
         * 文件保存后缀名，默认为 `png`
         */
        saveSuffixName: config.saveSuffixName ?? 'png'
    }
};