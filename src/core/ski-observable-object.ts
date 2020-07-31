import SkiObservableProperty from './ski-observable-property.js'
import { lazyGetter } from '../extras/lazy-getter'

export type ObservableObject<T> = {
  [K in keyof T]: SkiObservableProperty<T[K]>
}

export type Observable<T> = T

const observers = new WeakMap<object, ObservableObject<any>>()
const proxies = new WeakMap<object, Observable<any>>()

export const isObservable = <T extends object>(object: T): object is Observable<T> =>
  proxies.has(object)

export const observableProperty = <T extends object>(
  object: Observable<T>,
  property: keyof T
): SkiObservableProperty<T[typeof property]> => observers.get(object)![property]

export const observable = <T extends object>(object: T): Observable<T> => {
  if (proxies.has(object)) return proxies.get(object)!

  const storage = <ObservableObject<T>>{}
  const observable = lazyGetter(
    property => new SkiObservableProperty(object[property]),
    storage,
    object
  ) as ObservableObject<T>
  observers.set(object, observable)

  const proxy = onObjectChange(object, (property, _, value) =>
    storage[<any>property]?.set(value)
  )
  proxies.set(object, proxy)
  return proxy
}

export const onObjectChange = <T extends object>(
  object: T,
  onChange: (property: PropertyKey, oldValue, value) => void
) =>
  new Proxy(object, {
    set(target, property, value) {
      const oldValue = target[property]
      Reflect.set(target, property, value) && onChange(property, oldValue, value)
      return true
    },
  })
