import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { from } from './from'
import { run } from '../operators/run'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    run(callback: (v: T, index: number) => any, index?: number): ExtendedAsyncGenerator<T>
  }
}

ExtendedAsyncGenerator.prototype.run = function (callback, index?) {
  return from(run(this, callback, index))
}
