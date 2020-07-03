import { HasAsyngIterator, ExtendedAsyncGenerator } from '../extended-async-generator'
import { clone } from '../operators/clone'

export function from<T>(source: HasAsyngIterator<T>): ExtendedAsyncGenerator<T> {
  return Object.setPrototypeOf(clone(source), ExtendedAsyncGenerator.prototype)
}
