/*
 * Tencent is pleased to support the open source community by making TMagicEditor available.
 *
 * Copyright (C) 2023 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from 'path';

import { defineConfig } from 'vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import vue from '@vitejs/plugin-vue';

import pkg from './package.json';

export default defineConfig({
  plugins: [vue(), VueSetupExtend()],

  resolve: {
    alias:
      process.env.NODE_ENV === 'production'
        ? [{ find: /^@editor/, replacement: path.join(__dirname, './src') }]
        : [
            { find: /^@editor/, replacement: path.join(__dirname, './src') },
            { find: /^@tmagic\/schema/, replacement: path.join(__dirname, '../schema/src/index.ts') },
            { find: /^@tmagic\/utils/, replacement: path.join(__dirname, '../utils/src/index.ts') },
            { find: /^@tmagic\/core/, replacement: path.join(__dirname, '../core/src/index.ts') },
            { find: /^@tmagic\/form/, replacement: path.join(__dirname, '../form/src/index.ts') },
            { find: /^@tmagic\/stage/, replacement: path.join(__dirname, '../stage/src/index.ts') },
          ],
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },

  build: {
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
    target: 'esnext',

    lib: {
      entry: 'src/index.ts',
      name: 'TMagicEditor',
      fileName: 'tmagic-editor',
    },

    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external(id: string) {
        return Object.keys(pkg.dependencies).some((k) => new RegExp(`^${k}`).test(id));
      },

      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
      },
    },
  },
});
