import SkiNodeObserver from './ski-node-observer'

export default abstract class SkiTagObsever extends SkiNodeObserver {
  static childList = true
  static subtree = true

  constructor(root: Node, private name: string) {
    super(root)
  }

  protected updateTree(node: Node) {
    'querySelectorAll' in node && (<ParentNode>node).querySelectorAll(this.name).forEach(this.update, this)
  }

  protected detachTree(node: Node) {
    'querySelectorAll' in node && (<ParentNode>node).querySelectorAll(this.name).forEach(this.detach, this)
  }

  protected abstract update(element: Element)

  protected abstract detach(element: Node)
}
