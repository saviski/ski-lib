import '../core/ski-data';
import SkiPropertyObserver from '../core/ski-property-observer';
interface RepeatContent {
    template: DocumentFragment;
    children: WeakMap<object, any>;
}
export default class SkiRepeat extends SkiPropertyObserver<RepeatContent> {
    private name;
    constructor(root: Node, name?: string, attr?: string);
    protected prepare(element: Element): {
        template: DocumentFragment;
        children: WeakMap<object, any>;
    };
    protected set(element: Element, value: any[], content: RepeatContent): void;
    getNode(content: RepeatContent, item: any): Node;
}
export {};
