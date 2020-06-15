import { Rule } from '../core/ski-rule';
import SkiAttributeEvaluation from '../core/ski-attribute-evaluation';
export default class SkiAssociation extends SkiAttributeEvaluation {
    constructor(root: Node, name?: string, rule?: Rule);
    protected apply(element: Element, target: string, data: any): void;
}
