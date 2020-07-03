import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { get } from '../operators/get'
import { from } from './from'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    get(key: keyof T): AsyncGenerator<T[typeof key]>
  }
}

ExtendedAsyncGenerator.prototype.get = function (key) {
  return get(this, key, from)
}
