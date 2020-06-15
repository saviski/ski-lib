import SkiNodeObserver from './ski-node-observer';
export default class SkiTagObsever extends SkiNodeObserver {
    constructor(root, name) {
        super(root);
        this.name = name;
    }
    updateTree(node) {
        'querySelectorAll' in node && node.querySelectorAll(this.name).forEach(this.update, this);
    }
    detachTree(node) {
        'querySelectorAll' in node && node.querySelectorAll(this.name).forEach(this.detach, this);
    }
}
SkiTagObsever.childList = true;
SkiTagObsever.subtree = true;
