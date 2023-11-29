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
  server: {
    historyApiFallback: {
			/** 这样的话 就可以 不要 /dynamic 了 */
      rewrites: [{ from: /./, to: '/dynamic.html' }],
    },
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
