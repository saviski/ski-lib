import '../core/ski-data';

import SkiPropertyObserver from '../core/ski-property-observer';

interface RepeatContent {
  template: DocumentFragment;
  children: WeakMap<object, any>;
}

export default class SkiRepeat extends SkiPropertyObserver<RepeatContent> {

  constructor(root: Node, private name = 'for', attr = 'of') {
    super(root, attr);
  }

  protected prepare(element: Element) {
    let template = document.createDocumentFragment();
    template.append(...element.childNodes);
    return { template, children: new WeakMap() };
  }

  protected set(element: Element, value: any[], content: RepeatContent) {
    let name = element.getAttribute(this.name);

    element.innerHTML = '';
    element.append(...value.map((item, index) => {
      let node = this.getNode(content, item);
      node.childNodes.forEach(node => Object.assign(node.skidata, name ? { [name]: item, index } : item ));
      return node;
    }));
    delete element.skidata.index;
  }

  getNode(content: RepeatContent, item: any): Node {
    let node = typeof item == 'object' && content.children.get(item);
    if (!node) {
      node = content.template.cloneNode(true);
      typeof item == 'object' && content.children.set(item, node);
    }
    return node;
  }

}