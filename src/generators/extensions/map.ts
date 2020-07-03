import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { map } from '../operators/map'
import { from } from './from'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    map<U>(next: (v: T, index: number) => U, index?: number): ExtendedAsyncGenerator<U>
  }
}

ExtendedAsyncGenerator.prototype.map = function (next, index) {
  return from(map(this, next, index))
}
