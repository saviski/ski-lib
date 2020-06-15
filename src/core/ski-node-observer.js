export default class SkiNodeObserver {
    constructor(root) {
        this.root = root;
        // TODO: reuse MutationObserver since several are created for the same root ?
        this.mutationObserver = new MutationObserver(mutationsList => mutationsList.forEach(record => this.onChange(record)));
    }
    init() {
        let nodeClass = this.constructor;
        this.mutationObserver.observe(this.root, {
            attributeFilter: this.attributeFilter,
            attributeOldValue: nodeClass.attributeOldValue,
            attributes: nodeClass.attributes,
            characterData: nodeClass.characterData,
            characterDataOldValue: nodeClass.characterDataOldValue,
            childList: nodeClass.childList,
            subtree: nodeClass.subtree
        });
        this.updateTree(this.root);
        return this;
    }
    onChange(record) {
        var _a, _b;
        (_a = record.addedNodes) === null || _a === void 0 ? void 0 : _a.forEach(this.updateTree, this);
        (_b = record.removedNodes) === null || _b === void 0 ? void 0 : _b.forEach(this.detachTree, this);
    }
    disconnect() {
        this.mutationObserver.disconnect();
        this.detachTree(this.root);
    }
}
