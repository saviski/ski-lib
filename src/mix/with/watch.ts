import { onObjectChange } from './../../core/ski-observable-object.js'
import { Mixin, Constructor } from '../in.js'

export interface Observable {
  propertyChangedCallback(property: PropertyKey, oldValue, value)
}

const watch = <A extends object>(): Mixin<Constructor<A & Observable>> => superclass =>
  new Proxy(<any>superclass, {
    construct(constructor, args) {
      const self = new constructor(...args)
      return onObjectChange(self, self.propertyChangedCallback.bind(self))
    },
  })

export default watch
