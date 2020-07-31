import { map } from './map'
import { clone } from './clone'
import { HasAsyngIterator } from '../extended-async-generator.js'

export function get<T = any>(
  source: HasAsyngIterator<T>,
  property: keyof T,
  wrap = clone
): AsyncGenerator<T[typeof property]> {
  return wrap(map<T, any>(source, data => data[property]))
}
