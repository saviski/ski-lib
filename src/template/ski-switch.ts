import SkiPropertyObserver from '../core/ski-property-observer'

export default class SkiSwitch extends SkiPropertyObserver<{ contents: Element[] }> {
  constructor(root: Node, attr = 'switch', private condiction = 'case', private fallback = 'default') {
    super(root, attr)
  }

  protected prepare(element: Element) {
    return {
      contents: Array.from(element.children).map(child => element.removeChild(child)),
    }
  }

  private match(value: any, contents: Element[]): ChildNode {
    return (
      contents.find(element => element.getAttribute(this.condiction) == value) ||
      contents.find(element => element.hasAttribute(this.fallback)) ||
      document.createComment('unmatched condiction')
    )
  }

  protected set(element: Element, value: any, { contents }) {
    let match = this.match(value, contents)
    element.firstElementChild?.replaceWith(match) ?? element.appendChild(match)
  }
}
