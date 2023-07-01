import type { GetOOSByACSuccessCallback, UploadOOSOptions, GeneralCallbackResult, Config } from '../types';
import { isImage, loading } from '../utils';
import { Buffer } from 'buffer';

class UploadOOS {
    /**
   * 限制参数的生效时间，单位小时
   */
    private timeout: number;
    /**
     * 限制上传文件的大小，单位为MB
     */
    private maxSize: number;
    /**
     * 第三方OOS授权token
     */
    private securityToken: string;
    /**
     * 第三方OOS授权access_key_id
     */
    private accessKeyId: string;
    /**
     * 第三方OOS授权access_key_secret
     */
    private accessKeySecret: string;
    /**
     * 上传的阿里云OSS地址
     * + 小程序后台需要同步添加上传合法域名
     */
    private uploadImageUrl: string;
    /**
     * 文件上传存储目录
     */
    private uploadDir: string;
    private formData: object;
    private getOOSByAC: () => Promise<GetOOSByACSuccessCallback>;
    private getPolicyBase64: () => string;

    private options: any;
    private config: any;

    /**
     * 构造函数
     * @param options 上传配置项
     */
    constructor(options: UploadOOSOptions, config?: Config) {
        console.log(config, '请求配置');
        this.config = config;
        this.options = options;
        this.timeout = options?.timeout || 1;
        this.maxSize = options?.maxSize || 5 * 1024 * 1024;
        this.securityToken = '';
        this.accessKeyId = '';
        this.accessKeySecret = '';
        this.uploadDir = options?.uploadDir || '';
        let url = '';
        url = config?.baseURI.pro || '';
        if (process.env.NODE_ENV !== 'development') {
            url = config?.baseURI.dev || '';
        }
        this.uploadImageUrl = options?.uploadImageUrl || url;
        this.formData = {
            ...config?.formData,
            ...options.formData
        };
        this.getOOSByAC = () => options?.getOOSByAC() as Promise<GetOOSByACSuccessCallback>;
        this.getPolicyBase64 = () => {
            if (options.getPolicyBase64) {
                return options.getPolicyBase64() as string;
            }

            return '';
        }
    }

    async getSignature(policy: string, accessKeySecret: string, options: UploadOOSOptions): Promise<string> {
        return await options?.getSignature(policy, accessKeySecret) as string;
    }

    /**
     * 接口获取OOS授权凭证
     */
    async getOOSByACInfo(): Promise<void> {
        const { accessKeyId, accessKeySecret, securityToken } = await this.getOOSByAC();

        this.accessKeyId = accessKeyId;
        this.accessKeySecret = accessKeySecret;
        this.securityToken = securityToken;
    }

    async getDocs() {
        return (await import('../../package.json')).homepage;
    }

    getPolicyBase64Res() {
        let date = new Date();
        // 设置过期时间
        date.setHours(date.getHours() + this.timeout);
        let srcT = date.toISOString();
        const policyText = {
            expiration: srcT,
            conditions: [
                // 限制上传文件大小
                ["content-length-range", 0, this.maxSize * 1024 * 1024],
            ],
        };

        return Buffer.from(JSON.stringify(policyText)).toString('base64');
    }

    /**
     * 获取上传参数
     */
    async getUploadParams() {
        const policy: string = this.getPolicyBase64Res();
        const signature = await this.getSignature(policy, this.accessKeySecret, this.options);

        return {
            // OSSAccessKeySecret: this.accessKeySecret,
            OSSAccessKeyId: this.accessKeyId,
            policy: policy,
            signature: signature,
            'x-oss-security-token': this.securityToken
        };
    }

    uploadFile(filePath: string, dir?: string, options?: UploadOOSOptions, config?: Config, apiName?: string): Promise<GeneralCallbackResult> {
        console.log(config, '全局配置信息');
        return new Promise(async (resolve, reject) => {
            const docs = `${await this.getDocs()}/api/${apiName}.html#请求参数`;

            if (!filePath) {
                reject({
                    code: 1,
                    msg: '文件路径不能为空',
                    docs: docs
                });
                return;
            }

            const dirPath = dir || this.uploadDir;

            if (!dirPath) {
                reject({
                    code: 1,
                    msg: '上传目录不能为空，请检查 `uploadDir` 参数是否设置',
                    docs: docs
                });
                return;
            }

            if (!this.uploadImageUrl) {
                reject({
                    code: 1,
                    msg: '上传服务器域名或上传的第三方OOS地址不能为空，请检查 `uploadImageUrl` 参数或 `baseURI` 全局参数是否设置 ',
                    docs: docs
                });
                return;
            }

            const suffix = isImage(filePath) ? filePath.split('.').pop() : (options?.saveSuffixName ?? config?.saveSuffixName);

            if (!suffix) {
                reject({
                    code: 1,
                    msg: '文件保存后缀不能为空，请检查 `saveSuffixName` 参数是否设置',
                    docs: docs
                });
                return;
            }

            let fileName = `${Date.now()}_${Math.floor(Math.random() * 1000000)}.${suffix}`;
            if (options?.genarateFileName) {
                fileName = await options.genarateFileName();
            }

            const fileUrl = `${this.uploadImageUrl}/${dirPath}/${fileName}`;

            const formData = {
                'key': `${dirPath}/${fileName}`,
                'success_action_status': 200,
                ...await this.getUploadParams(),
                ...this.formData
            };

            config?.loading && loading({ title: config?.loadingText as string });

            const uploadTask = uni.uploadFile({
                url: this.uploadImageUrl,
                filePath: filePath,
                name: 'file',
                timeout: config?.timeout ?? options?.timeout,
                formData: {
                    ...formData
                },
                complete: () => {
                    uni.hideLoading();
                },
                fail: async (res: any) => {
                    if (this.config && this.config.debug) {
                        console.warn(`【LwuUpload Debug:第三方oos返回结果】${JSON.stringify(res)}`);
                    }
                    // 上传超时判断
                    if (res.errMsg === 'uploadFile:fail timeout') {
                        reject({
                            code: 504,
                            msg: '上传超时，请检查上传配置 `timeout`',
                            data: res.data,
                            docs
                        });
                        return;
                    }
                    if (res.statusCode !== 200) {
                        reject({
                            code: 1,
                            msg: '上传失败，请稍后再试',
                            data: res.data,
                            docs
                        });
                        return;
                    }
                    reject({
                        code: 1,
                        msg: res.errMsg,
                        data: res.data,
                        docs
                    })
                },
                success: async () => {
                    resolve({
                        code: 0,
                        msg: 'success',
                        data: {
                            uploadTask: uploadTask,
                            url: fileUrl,
                            path: `/${dirPath}/${fileName}`
                        },
                        docs
                    });
                }
            });
        });
    }
}

export default UploadOOS;