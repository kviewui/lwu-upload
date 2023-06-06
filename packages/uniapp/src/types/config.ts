export interface Config {
    baseURI: {
        /**
         * 开发环境域名
         */
        dev: string;
        /**
         * 生产环境域名
         */
        pro: string;
    };
    /**
     * 调试模式，开启后控制台会显示内部调试打印信息
     */
    debug?: boolean;
    /**
     * 请求过程是否显示loading
     */
    loading?: boolean;
    /**
     * 请求中loading弹窗的提示文本，默认为 `'上传中...'`
     */
    loadingText?: string;
    /**
     * 自定义请求前拦截
     */
    before?: Function;
    /**
     * 自定义请求后拦截
     */
    after?: Function;
    /**
     * 自定义请求头信息
     */
    header?: object;
    /**
     * 请求超时时间，单位ms
     */
    timeout?: number;
    /**
     * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     */
    name?: string;
    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: object;
    /**
     * 文件保存后缀名，默认为 `png`
     */
    saveSuffixName?: string;
};