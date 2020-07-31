import SkiObservableFunction from '../eval/ski-observable-function.js'
import { forEach } from '../generators/operators/for-each.js'

export const computed = <T extends Object>(prototype: T, property: PropertyKey) => {
  const descriptor = Object.getOwnPropertyDescriptor(prototype, property)!
  Object.defineProperty(prototype, property, {
    get(this: Element) {
      const fn = new SkiObservableFunction(<any>descriptor!.get?.bind(this))
      forEach(fn.run(this), value => {
        Object.defineProperty(this, property, { value })
      })
      return descriptor.get!.call(this)
    },
  })
}
