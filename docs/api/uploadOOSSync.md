---
outline: deep
---

# uploadOOSSync <Badge type="info" text="未发布" />

直传第三方对象存储平台，这是一个同步接口。

::: tip 名词解释
为了统一说法，第三方对象存储平台统一命名为 [`OOS`](/definition)
:::

### 请求参数

| 参数名             | 类型                                                                   | 必填 | 说明                                                                                                                                                                                                                     |
| --------------- | -------------------------------------------------------------------- | -- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filePath        | `String`                                                             | 是  | 要上传文件资源的路径                                                                                                                                                                                                             |
| uploadDir       | `String`                                                             | 是  | 文件上传至[OOS](/definition)平台的存储目录                                                                                                                                                                                                          |
| maxSize         | `Number`                                                             | 否  | 限制上传文件的大小，单位为MB，默认值为 `5`                                                                                                                                                                                               |
| timeout         | `Number`                                                             | 否  | 限制参数的生效时间，单位小时，默认值为 `1`                                                                                                                                                                                                |
| uploadImageUrl  | `String`                                                             | 否  | 上传的[OOS](/definition)地址，示例：`https://demo-static.oss-cn-hangzhou.aliyuncs.com`，该参数设置后全局配置的 `baseURI` 参数将失效                                                                                                                                                      |
| formData        | `Object`                                                             | 否  | HTTP 请求中其他额外的 form data                                                                                                                                                                                                |
| getOOSByAC     | `() => Promise<GetOOSByACSuccessCallback>` [GetOOSByACSuccessCallback](/ts/aliyun#getossbyacsuccesscallback)  | 是  | 获取[OOS](/definition)授权访问凭证信息，[使用STS临时访问凭证访问OSS](https://help.aliyun.com/document_detail/100624.html?spm=a2c4g.375246.0.0.29494f77gjhPg6)                                                                                            |
| getPolicyBase64 | `string`                                                             | 否  | 获取签名的base64字符串，见下方说明                                                                                                                                                                                                   |
| getSignature    | `(policyBase64: string, accessKeySecret: string) => Promise<string>` | 是  | 获取[OOS](/definition)签名，参考[JavaScript客户端签名直传](https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.31926.0.0.3a735458ATBOW8)、[服务端签名后直传](https://help.aliyun.com/document_detail/31926.html?spm=a2c4g.31925.0.0.74505d3fr63lMY) |

### 返回值
| 参数名 | 类型 | 说明
| --- | --- | ---
| code | `number` | 状态码，`0`为成功、`1`为失败
| msg | `string` | 状态描述
| data | `object` \| `undefined` | 返回内容，见下方说明
| docs | `string` | 返回的文档地址，示例：`https://lwuu.fdproxy.cn/api/uploadOOSSync.html#请求参数`

### Data 说明
`filePath`、`uploadDir` 和 `uploadImageUrl` 字段校验失败时为 `undefined`；图片上传失败时结果为 [uni.uploadFile](https://uniapp.dcloud.net.cn/api/request/network-file.html#uploadfile)的失败结果，图片上传成功时返回内容见[上传成功的Data 结构说明](/api/aliyun#上传成功的data-结构说明)

### 上传成功的Data 结构说明
| 参数名 | 类型 | 说明
| --- | --- | ---
| uploadTask | `UniApp.UploadTask` | 上传任务实例，见[uploadTask对象的方法列表](/api/upload#uploadtask-对象的方法列表)
| url | `string` | 上传成功后阿里云OSS的完整地址
| path | `string` | 上传成功后文件存储的路径，即去除阿里云OSS域名后的地址，示例：`/static/uploads/2023-05-25/1685006606290_241520.png`

## 示例
```ts
import { type GetOOSByACSuccessCallback, type GeneralCallbackResult, Uploader } from "lwu-upload";
// 初始化请求库
const http = new Http({
    // 非真实地址，仅供演示使用
    baseUrl: {
        pro: "https://img.test.cn",
        dev: "https://img.test.cn",
    },
});

// 获取签名
const getSignature = (
  policyBase64: string,
  accessKeySecret: string,
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    resolve(
      await uni.$api.apply.getSignature({
        policyBase64: policyBase64,
        accessKeySecret: accessKeySecret,
      }),
    );
  });
};

// 获取oos授权凭证信息
const getOOSByACInfo = (): Promise<GetOOSByACSuccessCallback> => {
    return new Promise(async (resolve, reject) => {
        interface Result {
            code: number;
            data: {
                access_key_id: string;
                access_key_secret: string;
                expiration: string;
                security_token: string;
                [key: string]: any;
            }
        };
        const result = await getOOSByAC() as Result;
        if (result.code !== 1) {
            console.warn('获取上传配置信息失败，请稍后再试');
            return;
        }

        resolve({
            accessKeyId: result.data.access_key_id,
            accessKeySecret: result.data.access_key_secret,
            expiration: result.data.expiration,
            securityToken: result.data.security_token
        } as GetOOSByACSuccessCallback);
    });
};

uni.chooseImage({
  count: 9,
  sizeType: ["compressed"],
  success: async (res: UniApp.ChooseImageSuccessCallbackResult) => {
    console.log(res);
    try {
        const { data } = await uploader.uploadOOSSync({
            filePath: res.tempFilePaths[0],
            uploadDir: `static/uploads/testImg/2023-06-07/121212`,
            // saveSuffixName: 'png',
            // uploadImageUrl: 'http://img.kags.cn',
            getOOSByAC: getOOSByACInfo,
            getPolicyBase64: getPolicyBase64,
            getSignature: getSignatureRes
        });

        // 上传进度监听
        data.uploadTask.onProgressUpdate((res: UniApp.OnProgressUpdateResult) => {
            console.log(res);
        });
    } catch (e) {
        const error = e as GeneralCallbackResult;
        console.error(error);
    }
  },
});
```
