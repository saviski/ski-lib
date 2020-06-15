export default abstract class SkiNodeObserver {
    protected root: Node;
    protected readonly attributeFilter?: string[];
    static readonly attributeOldValue?: boolean;
    static readonly attributes?: boolean;
    static readonly characterData?: boolean;
    static readonly characterDataOldValue?: boolean;
    static readonly childList?: boolean;
    static readonly subtree?: boolean;
    private mutationObserver;
    constructor(root: Node);
    init(): this;
    protected onChange(record: MutationRecord): void;
    disconnect(): void;
    protected abstract updateTree(node: Node): any;
    protected abstract detachTree(node: Node): any;
}
