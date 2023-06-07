interface Files {
    name?: string;
    file?: File;
    uri: string;
}
interface UploadParams {
    /**
     * 开发者服务器 url
     */
    url: string;
    /**
     * 需要上传的文件列表。**使用 files 时，filePath 和 name 不生效**。
     */
    files: Files[];
    /**
     * 文件类型，image/video/audio
     */
    fileType?: 'image' | 'video' | 'audio';
    /**
     * 要上传的文件对象。
     */
    file?: File;
    /**
     * 要上传文件资源的路径。
     */
    filePath: string;
    /**
     * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
     */
    name: string;
    /**
     * HTTP 请求 Header, header 中不能设置 Referer。
     */
    header?: object;
    /**
     * 超时时间，单位 ms
     */
    timeout?: number;
    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: Object;
    /**
     * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
     */
    success?: (result: UniApp.UploadFileSuccessCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    fail?: (result: UniApp.GeneralCallbackResult) => void;
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: (result: UniApp.GeneralCallbackResult) => void;
    /**
     * 自定义请求域名
     * + 设置该参数后，本次请求时全局配置的 `baseURI` 将失效
     */
    domain?: string;
    /**
     * 自定义请求前拦截
     */
    before?: Function;
    /**
     * 自定义请求后拦截
     */
    after?: Function;
    /**
     * 文件保存后缀名，默认为 `png`
     */
    saveSuffixName?: string;
}

interface Config {
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
}

/**
 * 第三方OOS授权返回凭证结构，包括第三方对象存储平台的临时授权凭证
 */
interface GetOOSByACSuccessCallback {
    /**
     * OOS授权的访问密钥AccessKey ID
     */
    accessKeyId: string;
    /**
     * OOS授权的访问密钥AccessKey Secret
     */
    accessKeySecret: string;
    /**
     * OOS授权的过期时间
     */
    expiration: string;
    /**
     * OOS授权的安全令牌SecurityToken
     */
    securityToken: string;
    [key: string]: any;
}
/**
 * 第三方OOS上传参数结构
 */
interface UploadOOSOptions {
    /**
     * 要上传文件资源的路径
     */
    filePath: string;
    /**
     * 文件上传的存储目录
     */
    uploadDir: string;
    /**
     * 限制上传文件的大小，单位为MB
     * + 默认值为 `5`
     */
    maxSize?: number;
    /**
     * 限制参数的生效时间，单位小时
     * + 默认值为 `1`
     */
    timeout?: number;
    /**
     * 上传的第三方OOS地址
     * + 小程序后台需要同步添加上传合法域名
     */
    uploadImageUrl?: string;
    /**
     * HTTP 请求中其他额外的 form data
     */
    formData?: object;
    /**
     * 获取第三方OOS授权访问凭证信息
     */
    getOOSByAC: () => Promise<GetOOSByACSuccessCallback>;
    /**
     * 获取签名的base64字符串
     */
    getPolicyBase64?: () => string;
    /**
     * 获取第三方OOS签名
     */
    getSignature: (policyBase64: string, accessKeySecret: string) => Promise<string>;
    /**
     * 初始化文件名称处理程序
     */
    genarateFileName?: () => Promise<string>;
    /**
     * 文件保存后缀名，默认为 `png`
     */
    saveSuffixName?: string;
}
interface GeneralCallbackResult {
    code: number;
    data?: {
        uploadTask: any;
        url: string;
        path: string;
    };
    msg: string;
    docs?: string;
}

declare class Uploader {
    /**
     * 全局配置信息
     */
    private globalConfig;
    /**
     * 请求配置信息
     */
    private reqConfig;
    constructor(config: Config);
    /**
     * 设置请求配置信息，方便链式调用
     * @param config
     */
    config(config: Config): this;
    /**
     * 设置请求头信息，方便链式调用
     * @param header
     */
    setHeader(header: object): this;
    /**
     * 设置额外的form data，方便链式调用
     * @param formData
     */
    setFormData(formData: object): this;
    /**
     * 普通文件上传
     * @param params
     */
    upload(params: UploadParams): UniApp.UploadTask;
    /**
     * 第三方oos直传，同步上传
     * @param options
     */
    uploadOOSSync(options: UploadOOSOptions): Promise<GeneralCallbackResult>;
    /**
     * 第三方oos直传，异步上传
     * @param options
     */
    uploadOOS(options: UploadOOSOptions): void;
}

export { Config, Files, GeneralCallbackResult, GetOOSByACSuccessCallback, UploadOOSOptions, UploadParams, Uploader };
