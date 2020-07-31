import { HasAsyngIterator } from './../extended-async-generator'
import { next } from './next.js'

export const STREAM_VALUE = new WeakMap<HasAsyngIterator<any>, any>()

export async function watch<T>(source: HasAsyngIterator<T>) {
  const generator = source[Symbol.asyncIterator]()
  do {
    let nextResult = next(generator)
    var data = await nextResult
    !data.done && STREAM_VALUE.set(source, data.value)
  } while (!data.done)
}
