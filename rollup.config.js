import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'
const isDev = process.env.NODE_ENV !== 'production'


export default {
  input: './src/main.ts',
  output: [

    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
    { file: pkg.browser, format: 'umd' }
  ],

  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    !isDev && terser(),
    postcss(),


    isDev && livereload(),
    isDev && serve({
      // open: true,
      contentBase: 'dist'
    })
  ],
  external: ['lodash']
}
