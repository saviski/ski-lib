import { map } from './map'
import { clone } from './clone'

export function get<T = any>(source: AsyncGenerator<T>, property: keyof T, wrap = clone): AsyncGenerator<T[typeof property]> {
  return wrap(map<T, any>(source, data => data[property]))
}
