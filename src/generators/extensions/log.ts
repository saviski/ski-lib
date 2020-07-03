import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { log } from '../operators/log'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    log(...args: any[]): void
  }
}

ExtendedAsyncGenerator.prototype.log = function (...args) {
  log(this, ...args)
}
