---
outline: deep
---

# uploadOOS <Badge type="info" text="未发布" />

直传第三方对象存储平台，这是一个异步接口。

::: tip 名词解释
为了统一说法，第三方对象存储平台统一命名为 [`OOS`](/definition)
:::

### 请求参数

同 [uploadOOSSync 请求参数](/api/uploadOOSSync#请求参数)

### 返回值
同 [uploadOOSSync 返回值](/api/uploadOOSSync#返回值)

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
    uploader
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