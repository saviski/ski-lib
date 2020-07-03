import { ExtendedAsyncGenerator } from '../extended-async-generator'
import { find } from '../operators/find'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    find<S extends T>(predicate: (value: T, index: number) => value is S, index?: number): Promise<S>
  }
}

ExtendedAsyncGenerator.prototype.find = function (predicate, index) {
  return find(this, predicate, index)
}
