import SkiPropertyObserver from '../core/ski-property-observer';
export default class SkiSwitch extends SkiPropertyObserver<{
    contents: Element[];
}> {
    private condiction;
    private fallback;
    constructor(root: Node, attr?: string, condiction?: string, fallback?: string);
    protected prepare(element: Element): {
        contents: Element[];
    };
    private match;
    protected set(element: Element, value: any, { contents }: {
        contents: any;
    }): void;
}
