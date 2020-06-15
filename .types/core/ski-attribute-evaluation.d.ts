import SkiAttributeObserver from './ski-attribute-observer';
import { TypedSkiData } from './ski-data';
export default abstract class SkiAttributeEvaluation<T = Record<string, any>> extends SkiAttributeObserver {
    update(attr: Attr & TypedSkiData<T>, target: string): void;
    detach(attr: Attr): void;
    protected evaluate(element: Element, attr: Attr, propertyChain: string, expression: string): Promise<void>;
    protected attrSkiData(element: Element, name: string): T;
    protected prepare(_element: Element, _attr: Attr): T;
    protected abstract apply(element: Element, target: string, data: any, attr: TypedSkiData<T>): any;
}
