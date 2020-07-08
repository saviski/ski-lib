import { Rule } from '../core/ski-rule'
import SkiAttributeEvaluation from '../core/ski-attribute-evaluation'

export default class SkiCSSProperty extends SkiAttributeEvaluation {
  constructor(root: Node, name = '--', rule = Rule.PREFIX) {
    super(root, name, rule)
  }

  protected apply(element: HTMLElement, property: string, data: any) {
    element.style.setProperty('--' + property, data)
  }
}
