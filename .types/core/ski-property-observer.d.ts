import SkiAttributeEvaluation from './ski-attribute-evaluation';
import './ski-data';
export default abstract class SkiPropertyObserver<T> extends SkiAttributeEvaluation<T> {
    private attr;
    static subtree: boolean;
    static attributes: boolean;
    static childList: boolean;
    attributeFilter: string[];
    constructor(root: Node, attr: string);
    protected apply(element: Element, attr: string, value: any): void;
    protected setAttribute(element: Element, value: any): void;
    protected abstract set(element: Element, value: any, skidata: T): void;
    private defineProperty;
}
