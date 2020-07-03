import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { proxy } from '../operators/proxy'
import { from } from './from'

type AsyncGeneratorProxy<T> = {
  [K in keyof T]: AsyncGeneratorProxy<T[K]>
}

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    proxy: AsyncGeneratorProxy<T>
  }
}

Object.defineProperties(ExtendedAsyncGenerator.prototype, {
  proxy: {
    get(this: ExtendedAsyncGenerator<any>) {
      return proxy(this, from)
    },
  },
})
