import { Mixin, Constructor } from './mix'
import '../core/ski-data'

type CSSPropertyTypes<T> = { [K in keyof T]: (v: string) => T[K] }

const dashCase = (name: string) => name.replace(/([A-Z])/g, '-$1').toLowerCase()

class CSSProperties<T> {
  static cssProperties: Record<string, unknown>

  protected cssProperties!: Partial<
    {
      [K in keyof T]: T[K]
    }
  >

  /* tslint:disable:no-unused-variable */
  cssPropertyChangedCallback(_name: string, _oldvalue, _newvalue) {}
}

const defineClass = (superclass: typeof HTMLElement, cssProperties: CSSPropertyTypes<any>) =>
  class extends superclass {
    static cssProperties = cssProperties

    private get cssPropertiesProxyHandler() {
      const element = this
      return {
        nameFor(property) {
          return '--' + dashCase(property)
        },

        valueOf(property) {
          var value: string | undefined
          var has = true // typeof property == 'string' && property in cssProperties
          var name = this.nameFor(property)
          if (has) value = element.style.getPropertyValue(name) || getComputedStyle(element).getPropertyValue(name)
          return value === '' ? undefined : value
        },

        has(_, property) {
          return this.valueOf(property) !== undefined
        },

        get(_, property) {
          const value = this.valueOf(property)
          return value === undefined ? undefined : cssProperties[property]?.(value)
        },

        set(_, property, value): any {
          typeof property == 'string' && element.style.setProperty(this.nameFor(property), value.toString())
        },

        ownKeys(properties): PropertyKey[] {
          return Object.keys(properties).filter(name => this.has(properties, name))
        },

        deleteProperty(_, property): boolean {
          property in cssProperties && element.style.removeProperty(this.nameFor(property))
          return true
        },
      }
    }

    protected cssProperties = new Proxy({ ...cssProperties }, this.cssPropertiesProxyHandler)

    cssPropertyObserver: ParentNode

    constructor() {
      super()
      this.cssPropertyObserver = this.createObserver()
      this.observeCssProperties(cssProperties)
      // Object.assign(this.shadowRoot!.skidata, { css: this.cssProperties })
    }

    observeCssProperties(properties: CSSPropertyTypes<any>) {
      Object.entries(properties).map(([key, fn]) => this.makePropertyObservable(key, fn))
    }

    private createObserver() {
      const observer = document.createElement('div')
      const hiddenStyle = `position:absolute;width:0px;height:0px;overflow:hidden;pointer-events:none`
      observer.setAttribute('style', hiddenStyle)
      observer.setAttribute('aria-hidden', 'true')
      this.shadowRoot!.append(observer)
      observer.addEventListener('transitionrun', event => {
        let property = (<HTMLElement>event.composedPath()[0]).dataset.property!
        event.stopPropagation()
        this.cssPropertyChangedCallback(property, null, this.cssProperties[property])
      })
      return observer
    }

    private makePropertyObservable(key: string, fn: (v: string) => any) {
      const prop = 'width'

      if (typeof fn('1') == 'number') {
        let el = document.createElement('div')
        el.style[prop] = `calc(var(--${dashCase(key)}, 0) * 1px)`
        el.style.transition = `${prop} 0.001s`
        el.dataset.property = key
        this.cssPropertyObserver.append(el)
      }
    }

    cssPropertyChangedCallback(_name, _old, _value) {}
  }

export default function cssProperties<T>(cssProperties: CSSPropertyTypes<T>): Mixin<Constructor<CSSProperties<T>>> {
  return (superclass: any) =>
    <any>defineClass(<typeof HTMLElement>superclass, Object.assign({}, superclass['cssProperties'], cssProperties))
}
