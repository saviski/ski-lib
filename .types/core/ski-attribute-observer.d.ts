import { Rule } from './ski-rule';
import SkiNodeObserver from './ski-node-observer';
export default abstract class SkiAttributeObserver extends SkiNodeObserver {
    static attributes: boolean;
    static childList: boolean;
    static subtree: boolean;
    protected readonly evaluationSnapshot: boolean;
    private xPathExpression;
    private matches;
    constructor(root: Node, name: string, rule: Rule);
    private get evaluationType();
    protected attrName(name: string): string;
    protected findNodes(node: Node): Generator<Attr, void, unknown>;
    protected updateTree(node: Node): void;
    protected detachTree(node: Node): void;
    protected onChange(record: MutationRecord): void;
    protected camelCase: (name: string) => string;
    protected abstract update(attr: Attr, target: string): void;
    protected abstract detach(attr: Attr, target: string): void;
}
