import type { UploadParams, Config, UploadOOSOptions } from './types';
import { useConfig, useInterceptor } from './utils';
import UploadOOS from './utils/oos';

export class Uploader {
  /**
   * 全局配置信息
   */
  private globalConfig: Config = {
    baseURI: {
      pro: '',
      dev: ''
    }
  };

  /**
   * 请求配置信息
   */
  private reqConfig: UploadParams = {
    url: '',
    files: [],
    filePath: '',
    name: ''
  };

  constructor(config: Config) {
    this.globalConfig = {
      ...useConfig(config)
    };

    this.reqConfig = {
      url: '',
      files: [],
      filePath: '',
      name: '',
      ...this.globalConfig
    };
  }

  /**
   * 设置请求配置信息，方便链式调用
   * @param config 
   */
  public config(config: Config) {
    this.reqConfig = {
      ...this.reqConfig,
      ...config
    };

    return this;
  }

  /**
   * 设置请求头信息，方便链式调用
   * @param header 
   */
  public setHeader(header: object) {
    this.reqConfig.header = {
      ...header
    };

    return this;
  }

  /**
   * 设置额外的form data，方便链式调用
   * @param formData 
   */
  public setFormData(formData: object) {
    this.reqConfig.formData = {
      ...formData
    };

    return this;
  }

  /**
   * 普通文件上传
   * @param params 
   */
  public upload(params: UploadParams) {
    const multiParams = {
      ...this.reqConfig,
      ...params
    };
    // 拦截器
    const chain = useInterceptor({
      request: (options: any) => {
        params.url = options.url;
        return options;
      },
      response: (response: any) => {
        return response;
      }
    }, {
      ...multiParams
    }, this.globalConfig);
    const header = {
      ...multiParams.header
    };
    const formData = {
      ...multiParams.formData
    };
    chain.request(multiParams);

    return uni.uploadFile({
      url: params.url,
      files: multiParams.files,
      fileType: multiParams.fileType,
      file: multiParams.file,
      filePath: multiParams.filePath,
      name: multiParams.name,
      header: header,
      timeout: multiParams.timeout,
      formData: formData,
      success: (res: UniApp.UploadFileSuccessCallbackResult) => {
        chain.response(res);
        params.success && params.success(res);
      },
      fail: (fail: UniApp.GeneralCallbackResult) => {
        chain.fail(fail);
        params.fail && params.fail(fail);
      },
      complete: (res: UniApp.GeneralCallbackResult) => {
        chain.complete(res);
        params.complete && params.complete(res);
      }
    })
  }

  /**
   * 第三方oos直传，同步上传
   * @param options 
   */
  public async uploadOOSSync(options: UploadOOSOptions) {
    const oosUploader = new UploadOOS(options, {
      baseURI: {
        pro: '',
        dev: ''
      },
      ...this.reqConfig
    });

    await oosUploader.getOOSByACInfo();

    return await oosUploader.uploadFile(options.filePath, options.uploadDir, options, 'uploadOOSSync');
  }

  /**
   * 第三方oos直传，异步上传
   * @param options 
   */
  public uploadOOS(options: UploadOOSOptions) {
    const oosUploader = new UploadOOS(options, {
      baseURI: {
        pro: '',
        dev: ''
      },
      ...this.reqConfig
    });

    return new Promise((resolve, reject) => {
      
    });

    oosUploader.getOOSByACInfo().then(() => {
      return oosUploader.uploadFile(options.filePath, options.uploadDir, options, 'uploadOOS');
    })
  }
}

/**
 * 导出配置参数类型
 */
export * from './types';