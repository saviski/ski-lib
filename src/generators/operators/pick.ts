import { map } from './map.js'
import { HasAsyngIterator } from '../extended-async-generator.js'

export function pick<T>(
  source: HasAsyngIterator<T>,
  property: keyof T
): AsyncGenerator<T[typeof property]> {
  const cacheKey = 'get:' + String(property)
  return source[cacheKey] || (source[cacheKey] = map(source, v => v[property]))
}
