import { __asyncValues, __awaiter } from "tslib";
import SkiDependencyEval from '../core/ski-dependency-eval';
import SkiNodeObserver from '../core/ski-node-observer';
import { Rule, xpathContent } from '../core/ski-rule';
import '../core/ski-data';
const templateEval = Symbol('templateEval');
export default class SkiTemplateString extends SkiNodeObserver {
    constructor(root, char = '`', rule = Rule.SURROUNDING) {
        super(root);
        let contentExpression = xpathContent(char, rule);
        this.xPathExpression = document.createExpression(contentExpression, null);
    }
    updateTree(node) {
        let nodes = this.xPathExpression.evaluate(node, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
        for (let i = 0, node; node = nodes.snapshotItem(i); i++)
            this.update(node, node.textContent);
    }
    detachTree(node) {
        this.detach(node);
        let textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => templateEval in node ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }, false);
        for (let textNode; textNode = textNodes.nextNode();)
            this.detach(textNode);
    }
    update(node, content) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            let result = new SkiDependencyEval(content, node, node.skidata).run();
            node[templateEval] = result;
            node.textContent = '';
            try {
                for (var result_1 = __asyncValues(result), result_1_1; result_1_1 = yield result_1.next(), !result_1_1.done;) {
                    let value = result_1_1.value;
                    node.textContent = value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (result_1_1 && !result_1_1.done && (_a = result_1.return)) yield _a.call(result_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    detach(node) {
        var _a;
        (_a = node[templateEval]) === null || _a === void 0 ? void 0 : _a.return();
    }
}
SkiTemplateString.childList = true;
SkiTemplateString.subtree = true;
