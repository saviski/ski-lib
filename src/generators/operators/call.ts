import { map } from './map'
import { clone } from './clone'
import { HasAsyngIterator } from '../extended-async-generator.js'

export function call<T, R>(
  source: HasAsyngIterator<T>,
  method: keyof T,
  wrap = clone,
  ...args
): AsyncGenerator<R> {
  return wrap(
    map<T, any>(source, data => (<any>data[method])(...args))
  )
}
