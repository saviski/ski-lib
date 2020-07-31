import { dashCase } from './../../extras/attributes'
import '../../core/ski-data.js'
import { Constructor, Mixin } from '../in'

type CSSPropertyTypes<T> = { [K in keyof T]: string }

export abstract class ElementWithCSSObservers {
  static cssProperties: CSSPropertyTypes<any>
  static defineProperty: (property: string) => void
  abstract cssPropertyChangedCallback(name: string, old?: string, value?: string)
  abstract makePropertyObservable(property: string, syntax?: string)
}

export const cssvar = (property: string) => '--' + dashCase(property)
const transitionProperty = 'width'
const hiddenStyle = `position:absolute;width:0px;height:0px;overflow:hidden;pointer-events:none`

export default function cssProperties<T>(
  cssProperties: CSSPropertyTypes<T>
): Mixin<Constructor<ElementWithCSSObservers & CSSPropertyTypes<T>>> {
  return (superclass: any) => {
    let cls = class extends superclass {
      static cssProperties = { ...superclass['cssProperties'], ...cssProperties }

      static defineProperty(property: string) {
        Object.defineProperty(this.prototype, property, <
          ThisType<ElementWithCSSObservers>
        >{
          get(this: HTMLElement) {
            return this.style.getPropertyValue(cssvar(property))
          },
          set(this: HTMLElement, value: string) {
            this.style.setProperty(cssvar(property), value)
          },
        })
      }

      cssPropertiesObserver = this.createCssPropertiesObserver()

      cssPropertyChangedCallback?(name: string, old?: string, value?: string)

      constructor(...args) {
        super(...args)
        for (const property of Object.keys(new.target.cssProperties))
          this.makePropertyObservable(property)
      }

      makePropertyObservable(property: string, _syntax = '<number>') {
        const el = document.createElement('div')
        el.style[transitionProperty] = `calc(var(${cssvar(property)}, 0) * 1px)`
        el.style.transition = `${transitionProperty} 0.001s`
        el.dataset.property = property
        el.dataset.value = this[property]
        this.cssPropertiesObserver.append(el)
      }

      private createCssPropertiesObserver() {
        const observer = document.createElement('div')
        observer.setAttribute('style', hiddenStyle)
        observer.setAttribute('aria-hidden', 'true')
        this.shadowRoot!.append(observer)
        observer.addEventListener('transitionrun', event => {
          let target = <HTMLElement>event.composedPath()[0]
          let property = target.dataset.property!
          let oldvalue = target.dataset.value
          let value = this[property]
          event.stopPropagation()
          Object.getOwnPropertyDescriptor(this, property)?.set?.(value)
          this.cssPropertyChangedCallback?.(property, oldvalue, value)
        })
        return observer
      }
    } as any
    Object.keys(cssProperties).forEach(property => cls.defineProperty(property))
    return cls
  }
}
