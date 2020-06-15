import SkiDependencyEval from '../core/ski-dependency-eval';
import SkiNodeObserver from '../core/ski-node-observer';
import { Rule, xpathContent, matcher } from '../core/ski-rule';
import '../core/ski-data';

const expression = Symbol('expression');

export default class SkiInlineExpression extends SkiNodeObserver {

  static childList = true;
  static subtree = true;
  
  private xPathExpression: XPathExpression;

  constructor(root: Node, private prefix = '{{', private suffix = '}}') {
    super(root);
    let contentExpression = xpathContent(prefix, Rule.CONTAINS);
    this.xPathExpression = document.createExpression(contentExpression, null);
  }

  protected updateTree(node: Node) {
    let nodes = this.xPathExpression.evaluate(node, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);

    for (let i = 0, node: Text; node = <Text> nodes.snapshotItem(i); i++)
      this.splitText(node);
  }

  protected detachTree(node: Node) {
    let textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: (node: Node) => expression in node? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    }, false);
    for (let textNode: Text; textNode = <Text> textNodes.nextNode();)
      this.detach(textNode);
  }

  private async splitText(text: Text) {
    let index = text.textContent!.indexOf(this.prefix);
    while (~index) {
      let expression = text.splitText(index);
      index = expression.textContent!.indexOf(this.suffix);
      text = ~index ? expression.splitText(index + this.suffix.length) : expression;
      ~index && this.updateText(expression);
      index = text.textContent!.indexOf(this.prefix);
    }
  }

  protected async updateText(text: Text) {
    const content = text.textContent!.substring(this.prefix.length, text.textContent!.length - this.suffix.length);
    let result = new SkiDependencyEval(content, text, text.skidata).run();
    text[expression] = result;
    text.textContent = '';
    for await (let value of result)
      text.textContent = value;
  }

  detach(text: Text) {
    (<AsyncGenerator<any,void>> text[expression])?.return();
  }

}