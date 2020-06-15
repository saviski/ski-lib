import { xpathAttr, matcher } from './ski-rule';
import SkiNodeObserver from './ski-node-observer';
export default class SkiAttributeObserver extends SkiNodeObserver {
    constructor(root, name, rule) {
        super(root);
        this.evaluationSnapshot = true;
        this.camelCase = (name) => name.replace(/-([a-z])/g, g => g[1].toUpperCase());
        let attributeExpression = xpathAttr(name, rule);
        this.matches = matcher(name, rule);
        this.xPathExpression = document.createExpression(attributeExpression, null);
    }
    get evaluationType() {
        return this.evaluationSnapshot ? XPathResult.ORDERED_NODE_SNAPSHOT_TYPE : XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
    }
    attrName(name) {
        return name.replace(this.matches, '');
    }
    *findNodes(node) {
        if (node instanceof DocumentFragment)
            return node.childNodes.forEach(this.findNodes, this);
        let attributes = this.xPathExpression.evaluate(node, this.evaluationType);
        if (this.evaluationSnapshot)
            for (let i = 0, attr; attr = attributes.snapshotItem(i); i++)
                yield attr;
        else
            for (let attr; attr = attributes.iterateNext();)
                yield attr;
    }
    updateTree(node) {
        for (let attr of this.findNodes(node))
            this.update(attr, this.attrName(attr.name));
    }
    detachTree(node) {
        for (let attr of this.findNodes(node))
            this.update(attr, this.attrName(attr.name));
    }
    onChange(record) {
        var _a, _b;
        (_a = record.addedNodes) === null || _a === void 0 ? void 0 : _a.forEach(this.updateTree, this);
        (_b = record.removedNodes) === null || _b === void 0 ? void 0 : _b.forEach(this.detachTree, this);
        record.attributeName &&
            this.matches.test(record.attributeName) &&
            record.target instanceof Element &&
            this.update(record.target.attributes[record.attributeName], this.attrName(record.attributeName));
    }
}
SkiAttributeObserver.attributes = true;
SkiAttributeObserver.childList = true;
SkiAttributeObserver.subtree = true;
