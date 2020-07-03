import SkiProperty from '../core/ski-property'
import { Mixin, Constructor } from './mix'
import '../core/ski-data'

const defineClass = (superclass: typeof Element, observables: object) =>
  class extends superclass {
    static observables = observables

    constructor(..._args: any[]) {
      super()
      const properties = Object.entries(observables).map(([name, value]) => SkiProperty.wrap(this, name, this[name] || value))
      Object.assign(this.shadowRoot!.skidata, properties)
    }
  }

export default function observables<A extends object>(attr: A): Mixin<Constructor<A>> {
  return (superclass: any) => <any>defineClass(<typeof Element>superclass, Object.assign({}, superclass['observables'], attr))
}
