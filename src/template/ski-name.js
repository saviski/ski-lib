import { Rule } from '../core/ski-rule';
import SkiAttributeObserver from '../core/ski-attribute-observer';
import '../core/ski-data';
export default class SkiName extends SkiAttributeObserver {
    constructor(root, name = '#', rule = Rule.PREFIX) {
        super(root, name, rule);
    }
    update(attr, target) {
        // TODO: find a better way of handling "attr.processed"
        if (!attr.processed) {
            this.root.skidata[target] = attr.ownerElement; //.events;
            attr.processed = true;
        }
    }
    detach(_attr, target) {
        this.root.skidata[target].return();
    }
}
