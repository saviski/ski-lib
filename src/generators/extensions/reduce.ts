import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { from } from './from'
import { reduce } from '../operators/reduce'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    reduce<U>(callbackfn: (previousValue: U, currentValue: T) => U, initial?: T): ExtendedAsyncGenerator<U>
  }
}

ExtendedAsyncGenerator.prototype.reduce = function (next, initial) {
  return from(reduce(this, next, initial))
}
