import SkiTagObsever from '../core/ski-tag-observer';
import SkiDependencyEval from '../core/ski-dependency-eval';

const val = Symbol('val');

export default class SkiVal extends SkiTagObsever {

  constructor(root: Node, name = 'val') {
    super(root, name);
  }

  protected async update(element: Element) {
    let text = document.createTextNode('');
    element.replaceWith(text);
    let result = new SkiDependencyEval(element.textContent!, text, text.skidata).run();
    text[val] = result;
    for await (let value of result)
      text.textContent = value;
  }

  protected detachTree(node: Node) {
    let textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: (node: Node) => val in node? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    }, false);
    for (let textNode: Text; textNode = <Text> textNodes.nextNode();)
      this.detach(textNode);
  }

  protected detach(text: Text) {
    (<AsyncGenerator<any, void>> text[val]).return();
  }

}