import { Rule } from '../core/ski-rule'
import SkiAttributeObserver from '../core/ski-attribute-observer'
import SkiDependencyEval from '../core/ski-dependency-eval'
import '../core/ski-data'

export default class SkiLet extends SkiAttributeObserver {
  constructor(root: Node, data?: Readonly<object>, name = 'let-', rule = Rule.PREFIX) {
    super(root, name, rule)
    data && Object.assign(root.skidata, data)
  }

  update(attr: Attr, target: string) {
    if (!attr.processed) {
      let element = attr.ownerElement!
      const result = new SkiDependencyEval(attr.value, element, element.skidata).run()
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
