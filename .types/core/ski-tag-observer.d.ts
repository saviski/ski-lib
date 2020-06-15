import SkiNodeObserver from './ski-node-observer';
export default abstract class SkiTagObsever extends SkiNodeObserver {
    private name;
    static childList: boolean;
    static subtree: boolean;
    constructor(root: Node, name: string);
    protected updateTree(node: Node): void;
    protected detachTree(node: Node): void;
    protected abstract update(element: Element): any;
    protected abstract detach(element: Node): any;
}
