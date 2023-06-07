import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LWU-UPLOAD",
  description: "一个轻量级的文件上传工具库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/markdown-examples' },
      { 
        text: '1.0.0',
        items: [
          {  text: '更新日志', link: 'changelog'},
          { text: '开源贡献', link: '/convention/contributing'},
          {  text: 'uniapp插件市场地址', link: 'https://ext.dcloud.net.cn/plugin?id=11409'},
        ]
      }
    ],

    editLink: {
      pattern: 'https://github.com/kviewui/lwu-upload/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    sidebar: [
      {
        text: '开发指南',
        items: [
          { text: '介绍', link: '/intro' },
          { text: '快速上手', link: '/start' },
          { text: '更新日志', link: '/changelog' },
          { text: '常见问题', link: '/faq' },
          { text: '名词解释', link: '/definition' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'config', link: '/api/config' },
          { text: 'setHeader', link: '/api/setHeader' },
          { text: 'setFormData', link: '/api/setFormData' },
          { text: 'upload', link: '/api/upload' },
          { text: 'uploadOOSSync', link: '/api/uploadOOSSync' },
          { text: 'uploadOOS', link: '/api/uploadOOS' }
        ]
      },
      {
        text: '配置',
        items: [
          { text: '全局配置', link: '/config/global' },
          { text: '请求配置', link: '/config/request' }
        ]
      },
      {
        text: 'TypeScript',
        items: [
          { text: '全局配置', link: '/ts/global' },
          { text: '请求配置', link: '/ts/request' },
          { text: '第三方OOS配置', link: '/ts/aliyun' },
          { text: '请求拦截器', link: '/ts/interceptor' }
        ]
      },
      {
        text: '开源贡献',
        items: [
          { text: '贡献者名单', link: '/convention/contributors'},
          { text: '贡献指南', link: '/convention/contributing'},
          { text: '提交内容协议', link: '/convention/commit-convention'},
          { text: '代码行为准则', link: '/convention/code-of-conduct'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
