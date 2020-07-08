import { Rule } from '../core/ski-rule'
import SkiAttributeEvaluation from '../core/ski-attribute-evaluation'

export default class SkiAssociation extends SkiAttributeEvaluation {
  constructor(root: Node, name = ':', rule = Rule.SUFFIX) {
    super(root, name, rule)
  }

  protected apply(element: Element, target: string, data: any) {
    if (target.includes('.') || typeof data == 'object' || typeof data == 'function') {
      let chain = target.split('.').map(this.camelCase)
      let property = chain.pop()!
      let object = chain.reduce((data, name) => data[name] ?? data[name], element)
      object[property] = data
    } else {
      element.setAttribute(target, data)
    }
  }
}
