import { Rule } from '../core/ski-rule'
import SkiAttributeObserver from '../core/ski-attribute-observer'

export default class SkiRelativeUri extends SkiAttributeObserver {
  constructor(root: Node, name = '\\', rule = Rule.SUFFIX) {
    super(root, name, rule)
  }

  update(attr: Attr, target: string) {
    const element = attr.ownerElement!
    element.setAttribute(target, new URL(attr.value, element.skidata.baseURI).href)
  }

  detach() {}
}
