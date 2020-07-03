import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { from } from './from'
import { until } from '../operators/until'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    until(next: Promise<any>): ExtendedAsyncGenerator<T>
  }
}

ExtendedAsyncGenerator.prototype.until = function (next) {
  return from(until(this, next))
}
