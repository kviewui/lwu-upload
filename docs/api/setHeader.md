---
outline: deep
---

# setHeader <Badge type="info" text="未发布" />

设置请求头信息

## 使用示例
### 基本使用
```ts
uploader.setHeader({
  ...res.header,
  test: 222,
});
```

### `请求前拦截`使用
::: tip 提示
示例中的 **BeforeRequestCallbackResult** [`点此查看定义`](/ts/interceptor.html#before-请求前拦截返回类型定义)
:::
```ts
import {
  type BeforeRequestCallbackResult,
  Uploader,
} from "lwu-upload";

// 仅供示例使用，并不是真实的URL
const uploaderUrl = "https://demo.com";
const uploader = new Uploader({
  baseUrl: {
    dev: uploaderUrl,
    pro: uploaderUrl,
  },
  before: (res: BeforeRequestCallbackResult) => {
    // console.log(res, '请求前拦截');
    http.setHeader({
      ...res.header,
      test: 222,
    });
  }
});
```
