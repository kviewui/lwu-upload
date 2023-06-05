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

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
