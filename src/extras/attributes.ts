import SkiProperty from '../core/ski-property'
import { Mixin, Constructor } from './mix';
import '../core/ski-data';

const dashCase = (name: string) => 
  name.replace(/([A-Z])/g, '-$1').toLowerCase()

const camelCase = (name: string) => 
  name.replace(/-([a-z])/g, g => g[1].toUpperCase())

class WithAttributes {
  
  static attributes: Record<string, unknown>

  static observedAttributes: string[]

  protected attr!: Record<string, SkiProperty>

}

const defineClass = (superclass: typeof Element, attributes: object) => class extends superclass {
  
  static attributes = attributes

  static observedAttributes = Object.keys(attributes).map(dashCase)

  protected attr: Record<string, SkiProperty> = {}

  constructor(..._args: any[]) {
    super()
    for (const [name, value] of Object.entries(attributes)) {
      this.attr[name] = SkiProperty.wrap(this, name, this[name] || value)
      this.attr[name].watch(newvalue => this.setAttribute(name, newvalue.toString()))
    }
    Object.assign(this.shadowRoot!.skidata, this.attr)
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super['attributeChangedCallback']?.apply(this, arguments)
    oldValue != newValue && this.attr[camelCase(<string> name)].set(newValue)
  }

}

export default function attributes<A extends object>(attr: A): Mixin<typeof WithAttributes & Constructor<A>> { 
  return (superclass: any) => 
    <any> defineClass(<typeof Element> superclass, Object.assign({}, superclass['attributes'], attr))
}
