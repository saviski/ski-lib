import SkiNodeObserver from '../core/ski-node-observer';
import { Rule } from '../core/ski-rule';
import '../core/ski-data';
export default class SkiTemplateString extends SkiNodeObserver {
    static childList: boolean;
    static subtree: boolean;
    private xPathExpression;
    constructor(root: Node, char?: string, rule?: Rule);
    protected updateTree(node: Node): void;
    protected detachTree(node: Node): void;
    protected update(node: Text, content: string): Promise<void>;
    detach(node: Node): void;
}
