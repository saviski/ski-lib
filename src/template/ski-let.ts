import { Rule } from '../core/ski-rule'
import SkiAttributeObserver from '../core/ski-attribute-observer'
import '../core/ski-data'
import { SKIDATA_PROPERTY } from '../core/ski-data'
import SkiObservableExpresion from '../eval/ski-observable-expression.js'

export default class SkiLet extends SkiAttributeObserver {
  constructor(
    root: Node,
    data: Readonly<object> = {},
    name = 'let-',
    rule = Rule.PREFIX
  ) {
    super(root, name, rule)
    Object.defineProperty(root, SKIDATA_PROPERTY, {
      value: Object.create(data, { events: { value: root.events } }),
    })
  }

  update(attr: Attr, target: string) {
    if (!attr.processed) {
      let element = attr.ownerElement!
      const result = new SkiObservableExpresion(attr.value, element).run(element.skidata)
      this.apply(element, target, result)
      attr.processed = true
      // attr.ownerElement!.removeAttributeNode(attr)
    }
  }

  detach() {}

  protected apply(element: Element, name: string, value: any) {
    element.skidata[this.camelCase(name)] = value
  }
}
