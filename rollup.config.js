import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [{
      file: pkg.main
    }, { 
      file: pkg.module,
      pugins: [
        terser({
          output: {
            comments: false
          }
        })
      ]
    }
  ],
  external: Array.from(Object.keys(pkg.dependencies || {})),
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    })
  ]
}