import { Rule } from '../core/ski-rule'
import SkiAttributeEvaluation from '../core/ski-attribute-evaluation'

export default class SkiStyle extends SkiAttributeEvaluation {
  constructor(root: Node, name = 'style.', rule = Rule.PREFIX) {
    super(root, name, rule)
  }

  protected apply(element: HTMLElement, property: string, data: any) {
    element.style.setProperty(property, data)
  }
}

// while CSS.px is not widelly supported

const UNITS = ['px', 'em', 'ex', 'ch', 'rem', 'lh', 'vw', 'vh', 'vmin', 'vmax', 'deg', 'grad', 'rad', 'turn', 's', 'ms']
for (let unit of UNITS)
  Object.defineProperty(Number.prototype, unit, {
    get() {
      return this + unit
    },
  })

Object.defineProperty(Number.prototype, 'percent', {
  get() {
    return this + '%'
  },
})
