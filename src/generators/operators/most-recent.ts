import { HasAsyngIterator } from '../extended-async-generator.js'
import { watch, STREAM_VALUE } from './watch.js'

export const UNINITIALIZED = Error('UNINITIALIZED')

export function mostRecent<T>(source: HasAsyngIterator<T>): T {
  if (STREAM_VALUE.has(source)) return STREAM_VALUE.get(source)
  else {
    watch(source)
    throw UNINITIALIZED
  }
}
