import { Rule } from './ski-rule';
import SkiAttributeEvaluation from './ski-attribute-evaluation';
import './ski-data';
export default class SkiPropertyObserver extends SkiAttributeEvaluation {
    constructor(root, attr) {
        super(root, attr, Rule.EQUALS);
        this.attr = attr;
        this.attributeFilter = [this.attr];
        this.defineProperty();
    }
    apply(element, attr, value) {
        this.set(element, value, element.attributes[attr].skidata);
    }
    // protected onChange(record: MutationRecord) {
    //   record.target instanceof Element &&
    //     record.attributeName! in record.target.attributes &&
    //       !attr.processed && 
    //         this.update(record.target.attributes[record.attributeName!], record.attributeName!);
    // }
    setAttribute(element, value) {
        const isPrimitive = value => value !== Object(value);
        if (value === undefined || value === null || !isPrimitive(value))
            element.removeAttribute(value);
        else if (value.toString() != element.getAttribute(this.attr))
            element.setAttribute(this.attr, value); // this will trigger onChange again
    }
    defineProperty() {
        const set = this.set.bind(this);
        const attr = this.attr;
        attr in Element.prototype ||
            Object.defineProperty(Element.prototype, this.attr, {
                set(value) {
                    set(this, value, this.attributes[attr].skidata);
                },
                enumerable: false,
                configurable: false
            });
    }
}
SkiPropertyObserver.subtree = true;
SkiPropertyObserver.attributes = true;
SkiPropertyObserver.childList = false;
