import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { start } from '../operators/start'
import { from } from './from'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    start(value: T): ExtendedAsyncGenerator<T>
  }
}

ExtendedAsyncGenerator.prototype.start = function (value) {
  return from(start(this, value))
}
