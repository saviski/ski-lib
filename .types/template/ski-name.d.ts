import { Rule } from '../core/ski-rule';
import SkiAttributeObserver from '../core/ski-attribute-observer';
import '../core/ski-data';
export default class SkiName extends SkiAttributeObserver {
    constructor(root: Node, name?: string, rule?: Rule);
    update(attr: Attr, target: string): void;
    detach(_attr: Attr, target: string): void;
}
