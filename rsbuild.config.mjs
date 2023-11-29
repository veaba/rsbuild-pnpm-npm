import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

export default defineConfig({
  source: {
    alias: {
      '@': './src',
    },
    entry: {
      /** 这里期望 /dynamic 就可以访问，但实际 /不可访问 */
      dynamic: './src/index.jsx',
    },
  },
  html: {
    mountId: 'aa',
  },
  server: {
    historyApiFallback: {
      /** 这样的话 就可以 不要 /dynamic 了 */
      rewrites: [{ from: /./, to: '/dynamic.html' }],
    },

    /** proxy
     * 本地代理前的真实地址：/static/js/dynamic.js
     *
     */
    proxy: [
      {
        /**
         * [HPM] Error occurred while proxying request localhost:8080/static/js/dynamic.js to http://localhost:8080/ [ECONNREFUSED] (https://nodejs.org/api/errors.html#errors_common_system_errors)
         *
         * TODO：
         * 问题1：为什么 http://localhost:8080/static/js/dynamic.js 不存在
				 * 问题2：两个 proxy 的优先级处理
         */
        context: (pathname) => {
          console.log('js 匹配 pathname=>', pathname);
          const o = pathname.match('^/aa');
          console.log('js 匹配 o=>', o);
          return o;
        },
        secure: false,
        changeOrigin: true,
        target: 'http://localhost:8080',
        // pathRewrite: (pathname) => pathname.replace(/\/static\/js\/dynamic.js/, '/libs/jquery/2.1.4/jquery.min.js'),
        pathRewrite: (pathname) => {
          const newPath = pathname.replace(/^\/aa/, '');
          console.log('ls newPath=>', newPath);
          return newPath;
        },
      },
      /** it's ok
       * http://localhost:8080/static/js/dynamic.js
       * =>
       * http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
       */
      // {
      //   context: (pathname) => {
      //     console.log('js 匹配 pathname=>', pathname);
      //     const o = pathname.match('^/static');
      //     console.log('js 匹配 o=>', o);
      //     return o;
      //   },
      //   secure: false,
      // 	changeOrigin: true,
      //   target: 'http://apps.bdimg.com',
      //   pathRewrite: (pathname) => pathname.replace(/\/static\/js\/dynamic.js/, '/libs/jquery/2.1.4/jquery.min.js'),
      // },
      {
        /** return boolean*/
        context: (pathname) => {
          const x = !pathname.match('^/aa/');
          console.log('html 匹配=>', pathname);
          console.log('html 匹配 x=>', x);
          return x;
        },
        secure: false,
        changeOrigin: true,
        target: 'http://127.0.0.1:3000/a',
      },
    ],
  },
  dev: {
    startUrl: true,
    beforeStartUrl: async () => {
      console.log('dev start ==> ');
    },
  },
  tools: {
    bundlerChain: (_, { HtmlPlugin, CHAIN_ID }) => {},
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
});
