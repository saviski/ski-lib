import { Mixin, Constructor } from './mix';
import '../core/ski-data';

const defineClass = (superclass: typeof Element, elements: Record<string, string>) => class extends superclass {
  
  constructor(..._args: any[]) {
    super()
    for (const [name, selector] of Object.entries(elements))
      Object.defineProperty(this, name, {
        get(this: Element) {
          return this.shadowRoot?.querySelector(selector)
        }
      })
  }

}

export default function elements<T>(elements: { [A in keyof T]:  string }): Mixin<Constructor<{ readonly [A in keyof T]:  Element }>> { 
  return (superclass: any) => <any> defineClass(<typeof Element> superclass, elements)
}