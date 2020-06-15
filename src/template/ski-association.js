import { Rule } from '../core/ski-rule';
import SkiAttributeEvaluation from '../core/ski-attribute-evaluation';
export default class SkiAssociation extends SkiAttributeEvaluation {
    constructor(root, name = ':', rule = Rule.SUFFIX) {
        super(root, name, rule);
    }
    apply(element, target, data) {
        let chain = target.split('.').map(this.camelCase);
        let property = chain.pop();
        chain.reduce((data, name) => data[name], element)[property] = data;
    }
}
for (let unit of ['em', 'ex', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'])
    Object.defineProperty(Number.prototype, unit, { get() { return this + unit; } });
Object.defineProperty(Number.prototype, 'percent', { get() { return this + '%'; } });
