import { Rule } from '../core/ski-rule';
import SkiAttributeObserver from '../core/ski-attribute-observer';
import SkiDependencyEval from '../core/ski-dependency-eval';
import '../core/ski-data';
export default class SkiLet extends SkiAttributeObserver {
    constructor(root, data, name = 'let-', rule = Rule.PREFIX) {
        super(root, name, rule);
        data && Object.assign(root.skidata, data);
    }
    update(attr, target) {
        if (!attr.processed) {
            let element = attr.ownerElement;
            const result = new SkiDependencyEval(attr.value, element, element.skidata).run();
            this.apply(element, target, result);
            attr.processed = true;
        }
    }
    detach() {
    }
    apply(element, name, value) {
        element.skidata[this.camelCase(name)] = value;
    }
}
