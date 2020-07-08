import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { from } from './from'
import { until } from '../operators/until'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    until(...events: Array<AsyncGenerator<any> | Promise<any>>): ExtendedAsyncGenerator<T>
  }
}

ExtendedAsyncGenerator.prototype.until = function (...events) {
  return from(until(this, ...events))
}
