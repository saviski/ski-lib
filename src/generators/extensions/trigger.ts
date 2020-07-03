import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { from } from './from'
import { trigger } from '../operators/trigger'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    trigger<R>(factory: (v: T) => AsyncGenerator<R>): ExtendedAsyncGenerator<R>
  }
}

ExtendedAsyncGenerator.prototype.trigger = function (factory) {
  return from(trigger(this, factory))
}
