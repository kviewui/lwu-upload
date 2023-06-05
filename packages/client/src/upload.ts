import type { UploadParams } from './types';

export class Uploader {
  public upload(params: UploadParams) {
    return uni.uploadFile({
      url: params.url,
      files: params.files,
      fileType: params.fileType,
      file: params.file,
      filePath: params.filePath,
      name: params.name,
      header: params.header,
      timeout: params.timeout,
      formData: params.formData,
      success: (res: UniApp.UploadFileSuccessCallbackResult) => {
        params.success && params.success(res);
      },
      fail: (fail: UniApp.GeneralCallbackResult) => {
        params.fail && params.fail(fail);
      },
      complete: (res: UniApp.GeneralCallbackResult) => {
        params.complete && params.complete(res);
      }
    })
  }
}

/**
 * 导出配置参数类型
 */
export * from './types';