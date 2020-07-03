import SkiPropertyObserver from './ski-property-observer'

interface ConditionData {
  placeholder: ChildNode
}

export default abstract class SkiCondiction extends SkiPropertyObserver<ConditionData> {
  constructor(root: Node, attr: string, private fallback?: string) {
    super(root, attr)
  }

  protected abstract checkCondiction(value: any, element: Element): boolean

  protected prepare(element: Element) {
    const tag = element.tagName.toLowerCase()
    const elseElement = this.fallback && element.nextElementSibling?.matches(`[${this.fallback}]`) && element.nextElementSibling
    return {
      placeholder: elseElement || document.createComment(`<${tag}>hidden</${tag}>`),
    }
  }

  protected set(element: Element, value: string | null, { placeholder }: ConditionData) {
    if (this.checkCondiction(value, element)) placeholder.parentNode && placeholder.replaceWith(element)
    else element.parentNode && element.replaceWith(placeholder)
  }
}
