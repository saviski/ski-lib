import SkiPropertyObserver from './ski-property-observer';
interface CondictionData {
    placeholder: ChildNode;
}
export default abstract class SkiCondiction extends SkiPropertyObserver<CondictionData> {
    private fallback?;
    constructor(root: Node, attr: string, fallback?: string | undefined);
    protected abstract checkCondiction(value: any, element: Element): boolean;
    protected prepare(element: Element): {
        placeholder: Element | Comment;
    };
    protected set(element: Element, value: string | null, { placeholder }: CondictionData): void;
}
export {};
