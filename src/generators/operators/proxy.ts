import { map } from './map'
import { clone } from './clone'

export type AsyncGeneratorGet<T> = { [K in keyof T]: AsyncGeneratorGet<T[K]> & AsyncGenerator<T[K]> }

interface Getter {
  target: any
  fallback(target: any, property: PropertyKey): any
  callable?: (...args: any) => any
}

const getter = (options: Getter, { target, callable } = options): any =>
  new Proxy(callable || {}, {
    get(_, property) {
      return property in target
        ? typeof target[property] == 'function'
          ? target[property].bind(target)
          : target[property]
        : options.fallback(target, property)
    },
  })

export function proxy<T>(target: AsyncGenerator<T>, wrapper = clone): AsyncGeneratorGet<T> {
  const mapper = (target3, transform) => wrapper(map(target3, transform))

  const fallback = (target2, property) =>
    getter({
      target: mapper(target2, result => result[property]),
      fallback(p) {
        fallback(this.target, p)
      },
      callable: (...args) => mapper(target2, result => result[property](...args)),
    })

  return getter({ target, fallback })
}
