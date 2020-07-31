import { HasAsyngIterator } from '../extended-async-generator.js'

export function hasAsyncGenerator<T>(
  v: Partial<HasAsyngIterator<T>>
): v is HasAsyngIterator<T> {
  return v instanceof Object && Symbol.asyncIterator in v
}
