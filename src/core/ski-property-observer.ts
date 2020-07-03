import { Rule } from './ski-rule'
import SkiAttributeEvaluation from './ski-attribute-evaluation'
import './ski-data'

export default abstract class SkiPropertyObserver<T> extends SkiAttributeEvaluation<T> {
  static subtree = true
  static attributes = true
  static childList = false
  attributeFilter = [this.attr]

  constructor(root: Node, private attr: string) {
    super(root, attr, Rule.EQUALS)
    this.defineProperty()
  }

  protected apply(element: Element, attr: string, value: any) {
    this.set(element, value, element.attributes[attr].skidata)
  }

  // protected onChange(record: MutationRecord) {
  //   record.target instanceof Element &&
  //     record.attributeName! in record.target.attributes &&
  //       !attr.processed &&
  //         this.update(record.target.attributes[record.attributeName!], record.attributeName!);
  // }

  protected setAttribute(element: Element, value: any) {
    const isPrimitive = value => value !== Object(value)
    if (value === undefined || value === null || !isPrimitive(value)) element.removeAttribute(value)
    else if (value.toString() != element.getAttribute(this.attr)) element.setAttribute(this.attr, value) // this will trigger onChange again
  }

  protected abstract set(element: Element, value: any, skidata: T): void

  private defineProperty() {
    const set = this.set.bind(this)
    const attr = this.attr

    attr in Element.prototype ||
      Object.defineProperty(Element.prototype, this.attr, {
        set(this: Element, value: any) {
          set(this, value, this.attributes[attr].skidata)
        },

        enumerable: false,
        configurable: false,
      })
  }
}
