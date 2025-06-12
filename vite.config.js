// import commonjs from '@rollup/plugin-commonjs';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import fs from 'fs';
// import path from 'path';
// import { defineConfig } from 'vite';

// function getEntryFiles(srcDir, extensions) {
//   const entry = {};

//   function traverseDir(currentDir) {
//     const files = fs.readdirSync(currentDir);

//     files.forEach((file) => {
//       const filePath = path.join(currentDir, file);

//       const isDirectory = fs.statSync(filePath).isDirectory();

//       if (isDirectory) {
//         traverseDir(filePath);
//       } else if (extensions.includes(path.extname(file))) {
//         const name = path.relative(srcDir, filePath).replace(/\..*$/, "");
//         entry[name] = filePath;
//       }
//     });
//   }

//   traverseDir(srcDir);

//   return entry;
// }

// const getHtmlEntryFiles = (srcDir) => getEntryFiles(srcDir, ['.html']);
// // const getCssEntryFiles = (srcDir) => getEntryFiles(srcDir, ['.css']);
// // const getJsEntryFiles = (srcDir) => getEntryFiles(srcDir, ['.js']);

// export default defineConfig({
//   root: './',
//   build: {
//     rollupOptions: {
//       input: {
//         ...getHtmlEntryFiles('./'),
//         // ...getCssEntryFiles('./'),
//         // ...getJsEntryFiles('./'),
//       },
//       plugins: [
//         nodeResolve({
//           browser: true, // Ensure compatibility with browser environment
//           preferBuiltins: false, // Avoid using Node.js built-ins
//           alias: {
//             'node:events': 'events',
//             'node:stream': 'stream-browserify',
//             'node:string_decoder': 'string_decoder',
//             'node:buffer': 'buffer',
//             'node:process': 'process',
//           }
//         }),
//         commonjs()
//       ],
//       external: [
//         'path',
//         'fs',
//         'url',
//         'assert',
//         'zlib',
//         'crypto',
//         'os',
//         'constants',
//         'child_process',
//         'dns',
//         'net',
//         'dgram',
//         'http',
//         'https',
//         'tls',
//         'v8',
//         'worker_threads',
//         'perf_hooks',
//         'process',
//         'fsevents'
//       ],
//       output: {
//         assetFileNames: (assetInfo) => {
//           if (/\.css$/.test(assetInfo.name || '')) {
//             return 'assets/css/[name][extname]';
//           }
//           if (/\.js$/.test(assetInfo.name || '')) {
//             return 'assets/js/[name][extname]';
//           }
//           if (/\.png$|\.jpg$|\.jpeg$|\.gif$|\.svg$/.test(assetInfo.name || '')) {
//             return 'assets/images/[name][extname]';
//           }
//           return 'assets/[name][extname]';
//         },
//         chunkFileNames: 'assets/js/[name].[hash].js',
//         entryFileNames: 'assets/js/[name].[hash].js'
//       }
//     },
//     outDir: './dist',
//     emptyOutDir: true
//   },
// });
