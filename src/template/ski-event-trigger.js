import { __awaiter } from "tslib";
import { Rule } from '../core/ski-rule';
import SkiDependencyEval from '../core/ski-dependency-eval';
import SkiAttributeObserver from '../core/ski-attribute-observer';
import '../core/ski-data';
import '../generators/extensions/trigger';
import '../generators/extensions/for-each';
export default class SkiEventTrigger extends SkiAttributeObserver {
    constructor(root, separator = '|') {
        super(root, separator, Rule.SEPARATOR);
        this.separator = separator;
    }
    update(attr, target) {
        if (!attr.processed) {
            let element = attr.ownerElement;
            let [listen, emit] = this.camelCase(target).split(this.separator);
            let evaluator = new SkiDependencyEval(attr.value, element, attr.skidata);
            const emitter = element.events[emit];
            element.events[listen].forEach((event) => {
                let copy = {};
                // for (const name in event) copy[name] = event[name];
                Object.assign(attr.skidata, { event }, copy);
                evaluator.run().next().then(({ value }) => emitter(value));
            });
            attr.processed = true;
        }
    }
    update_(attr, target) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!attr.processed) {
                const [listen, emit] = this.camelCase(target).split(this.separator);
                const element = attr.ownerElement;
                const listener = element.events[listen];
                const emitter = element.events[emit];
                attr.skidata.event = listener;
                const evaluator = new SkiDependencyEval(attr.value, element, attr.skidata);
                listener.trigger(() => evaluator.run()).forEach(emitter);
                attr.processed = true;
            }
        });
    }
    detach(attr, target) {
        let [listen] = this.camelCase(target).split(this.separator);
        let element = attr.ownerElement;
        element.events[listen].return();
    }
}
SkiEventTrigger.evaluationSnapshot = false;
