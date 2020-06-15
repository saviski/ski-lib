import SkiNodeObserver from '../core/ski-node-observer';
import '../core/ski-data';
export default class SkiInlineExpression extends SkiNodeObserver {
    private prefix;
    private suffix;
    static childList: boolean;
    static subtree: boolean;
    private xPathExpression;
    constructor(root: Node, prefix?: string, suffix?: string);
    protected updateTree(node: Node): void;
    protected detachTree(node: Node): void;
    private splitText;
    protected updateText(text: Text): Promise<void>;
    detach(text: Text): void;
}
