import { map } from './map'
import { clone } from './clone'

export function call<T, R>(source: AsyncGenerator<T>, method: keyof T, wrap = clone, ...args): AsyncGenerator<R> {
  return wrap(
    map<T, any>(source, data => (<any>data[method])(...args))
  )
}
