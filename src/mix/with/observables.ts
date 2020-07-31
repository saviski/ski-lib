import {
  observable as observableObject,
  ObservableObject,
} from './../../core/ski-observable-object'
import { Mixin, Constructor } from '../in'

const observable = <A extends object>(): Mixin<
  Constructor<A & ObservableObject<A>>
> => superclass =>
  new Proxy(<any>superclass, {
    construct(constructor, args) {
      const self = new constructor(...args)
      return observableObject(self)
    },
  })

export default observable
