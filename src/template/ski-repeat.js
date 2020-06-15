import '../core/ski-data';
import SkiPropertyObserver from '../core/ski-property-observer';
export default class SkiRepeat extends SkiPropertyObserver {
    constructor(root, name = 'for', attr = 'of') {
        super(root, attr);
        this.name = name;
    }
    prepare(element) {
        let template = document.createDocumentFragment();
        template.append(...element.childNodes);
        return { template, children: new WeakMap() };
    }
    set(element, value, content) {
        let name = element.getAttribute(this.name);
        element.innerHTML = '';
        element.append(...value.map((item, index) => {
            let node = this.getNode(content, item);
            node.childNodes.forEach(node => Object.assign(node.skidata, name ? { [name]: item, index } : item));
            return node;
        }));
        delete element.skidata.index;
    }
    getNode(content, item) {
        let node = typeof item == 'object' && content.children.get(item);
        if (!node) {
            node = content.template.cloneNode(true);
            typeof item == 'object' && content.children.set(item, node);
        }
        return node;
    }
}
