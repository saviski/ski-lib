import SkiDependencyEval from '../core/ski-dependency-eval';
import SkiNodeObserver from '../core/ski-node-observer';
import { Rule, xpathContent, matcher } from '../core/ski-rule';
import '../core/ski-data';

const templateEval = Symbol('templateEval');

export default class SkiTemplateString extends SkiNodeObserver {

  static childList = true;
  static subtree = true;
  
  private xPathExpression: XPathExpression;

  constructor(root: Node, char = '`', rule: Rule = Rule.SURROUNDING) {
    super(root);
    let contentExpression = xpathContent(char, rule);
    this.xPathExpression = document.createExpression(contentExpression, null);
  }

  protected updateTree(node: Node) {
    let nodes = this.xPathExpression.evaluate(node, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);

    for (let i = 0, node: Text; node = <Text> nodes.snapshotItem(i); i++)
      this.update(node, node.textContent!);
  }

  protected detachTree(node: Node) {
    this.detach(node);
    let textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: (node: Node) => templateEval in node? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    }, false);
    for (let textNode: Text; textNode = <Text> textNodes.nextNode();)
      this.detach(textNode);
  }

  protected async update(node: Text, content: string) {
    let result = new SkiDependencyEval(content, node, node.skidata).run();
    node[templateEval] = result;
    node.textContent = '';
    for await (let value of result)
      node.textContent = value;
  }

  detach(node: Node) {
    (<AsyncGenerator<any,void>> node[templateEval])?.return();
  }

}