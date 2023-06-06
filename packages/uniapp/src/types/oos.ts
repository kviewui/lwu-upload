/**
 * 第三方OOS授权返回凭证结构，包括第三方对象存储平台的临时授权凭证
 */
export interface GetOOSByACSuccessCallback {
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
export interface UploadOOSOptions {
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
    uploadImageUrl: string;
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
    getPolicyBase64: () => string;
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

export interface GeneralCallbackResult {
    code: number;
    data?: {
        uploadTask: any;
        url: string;
        path: string;
    };
    msg: string;
}