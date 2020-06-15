import { Rule, xpathAttr, matcher } from './ski-rule';
import SkiNodeObserver from './ski-node-observer';

export default abstract class SkiAttributeObserver extends SkiNodeObserver {

  
  static attributes = true;
  static childList = true;
  static subtree = true;
  
  protected readonly evaluationSnapshot: boolean = true;
  private xPathExpression: XPathExpression;
  private matches: RegExp;
  
  constructor(root: Node, name: string, rule: Rule) {
    super(root);
    let attributeExpression = xpathAttr(name, rule);
    this.matches = matcher(name, rule);
    this.xPathExpression = document.createExpression(attributeExpression, null);
  }

  private get evaluationType() {
    return this.evaluationSnapshot ? XPathResult.ORDERED_NODE_SNAPSHOT_TYPE : XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
  }

  protected attrName(name: string): string {
    return name.replace(this.matches, '');
  }

  protected * findNodes(node: Node) {
    if (node instanceof DocumentFragment)
      return node.childNodes.forEach(this.findNodes, this);
      
    let attributes = this.xPathExpression.evaluate(node, this.evaluationType);

    if (this.evaluationSnapshot)
      for (let i = 0, attr: Attr; attr = attributes.snapshotItem(i) as Attr; i++)
        yield attr;

    else
      for (let attr: Attr; attr = attributes.iterateNext() as Attr;)
        yield attr;
  }

  protected updateTree(node: Node) {
    for (let attr of this.findNodes(node))
      this.update(attr, this.attrName(attr.name));
  }

  protected detachTree(node: Node) {
    for (let attr of this.findNodes(node))
      this.update(attr, this.attrName(attr.name));
  }

  protected onChange(record: MutationRecord) {
    record.addedNodes?.forEach(this.updateTree, this);
    record.removedNodes?.forEach(this.detachTree, this);
    record.attributeName && 
      this.matches.test(record.attributeName) &&
        record.target instanceof Element &&
          this.update(record.target.attributes[record.attributeName], this.attrName(record.attributeName));
  }

  protected camelCase = (name: string) => name.replace(/-([a-z])/g, g => g[1].toUpperCase());
  
  protected abstract update(attr: Attr, target: string): void;

  protected abstract detach(attr: Attr, target: string): void;

}