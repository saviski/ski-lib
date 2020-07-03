import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { from } from './from'
import { reduce } from '../operators/reduce'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, index?: number): ExtendedAsyncGenerator<U>
  }
}

ExtendedAsyncGenerator.prototype.reduce = function (next, index) {
  return from(reduce(this, next, index))
}
