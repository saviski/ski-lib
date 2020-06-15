import { __asyncValues, __awaiter } from "tslib";
import SkiDependencyEval from '../core/ski-dependency-eval';
import SkiNodeObserver from '../core/ski-node-observer';
import { Rule, xpathContent } from '../core/ski-rule';
import '../core/ski-data';
const expression = Symbol('expression');
export default class SkiInlineExpression extends SkiNodeObserver {
    constructor(root, prefix = '{{', suffix = '}}') {
        super(root);
        this.prefix = prefix;
        this.suffix = suffix;
        let contentExpression = xpathContent(prefix, Rule.CONTAINS);
        this.xPathExpression = document.createExpression(contentExpression, null);
    }
    updateTree(node) {
        let nodes = this.xPathExpression.evaluate(node, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
        for (let i = 0, node; node = nodes.snapshotItem(i); i++)
            this.splitText(node);
    }
    detachTree(node) {
        let textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => expression in node ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }, false);
        for (let textNode; textNode = textNodes.nextNode();)
            this.detach(textNode);
    }
    splitText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = text.textContent.indexOf(this.prefix);
            while (~index) {
                let expression = text.splitText(index);
                index = expression.textContent.indexOf(this.suffix);
                text = ~index ? expression.splitText(index + this.suffix.length) : expression;
                ~index && this.updateText(expression);
                index = text.textContent.indexOf(this.prefix);
            }
        });
    }
    updateText(text) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const content = text.textContent.substring(this.prefix.length, text.textContent.length - this.suffix.length);
            let result = new SkiDependencyEval(content, text, text.skidata).run();
            text[expression] = result;
            text.textContent = '';
            try {
                for (var result_1 = __asyncValues(result), result_1_1; result_1_1 = yield result_1.next(), !result_1_1.done;) {
                    let value = result_1_1.value;
                    text.textContent = value;
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
    detach(text) {
        var _a;
        (_a = text[expression]) === null || _a === void 0 ? void 0 : _a.return();
    }
}
SkiInlineExpression.childList = true;
SkiInlineExpression.subtree = true;
