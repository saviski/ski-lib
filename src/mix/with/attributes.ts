import { dashCase } from './../../extras/attributes'
import '../../core/ski-data'
import { Constructor, Mixin } from '../in'

export interface ElementWithAttributes {
  attributes: { [attr: string]: string | undefined }
  observedAttributes: string[]
}

const attributes = <A extends object>(
  attributes: A
): Mixin<Constructor<A> & ElementWithAttributes> => (superclass: any) =>
  class extends superclass {
    static attributes: { [attr: string]: string | undefined } = {
      ...attributes,
      ...superclass['attributes'],
    }

    static get observedAttributes(): string[] {
      const value = Object.keys(this.attributes).map(dashCase)
      Object.defineProperty(this, 'observedAttributes', { value })
      this.init()
      return value
    }

    private static init() {
      for (const [name, value] of Object.entries(this.attributes))
        this.defineAttribute(name, value)
    }

    private static defineAttribute(name: string, defaultValue?: string) {
      Object.defineProperty(this.prototype, name, {
        get() {
          return name in this.attributeValues ? this.attributeValues[name] : defaultValue
        },

        set(value) {
          this.setAttribute(name, value)
        },
      })
    }

    protected attributeValues = {}
  } as any

export default attributes
