import { Rule } from '../core/ski-rule';
import SkiAttributeObserver from '../core/ski-attribute-observer';
import '../core/ski-data';
export default class SkiLet extends SkiAttributeObserver {
    constructor(root: Node, data?: Readonly<object>, name?: string, rule?: Rule);
    update(attr: Attr, target: string): void;
    detach(): void;
    protected apply(element: Element, name: string, value: any): void;
}
