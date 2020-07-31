import '../../core/ski-data'
import { Constructor, Mixin } from '../in'

const withElements = (superclass: typeof Element, elements: Record<string, string>) =>
  class extends superclass {
    constructor(..._args: any[]) {
      super()
      for (const [name, selector] of Object.entries(elements))
        Object.defineProperty(this, name, {
          get(this: Element) {
            return this.shadowRoot?.querySelector(selector)
          },
        })
    }
  }

export default function elements<T>(
  elements: { [A in keyof T]: string }
): Mixin<Constructor<{ readonly [A in keyof T]: Element }>> {
  return (superclass: any) => <any>withElements(<typeof Element>superclass, elements)
}
