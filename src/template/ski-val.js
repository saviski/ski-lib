import { __asyncValues, __awaiter } from "tslib";
import SkiTagObsever from '../core/ski-tag-observer';
import SkiDependencyEval from '../core/ski-dependency-eval';
const val = Symbol('val');
export default class SkiVal extends SkiTagObsever {
    constructor(root, name = 'val') {
        super(root, name);
    }
    update(element) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            let text = document.createTextNode('');
            element.replaceWith(text);
            let result = new SkiDependencyEval(element.textContent, text, text.skidata).run();
            text[val] = result;
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
    detachTree(node) {
        let textNodes = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => val in node ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }, false);
        for (let textNode; textNode = textNodes.nextNode();)
            this.detach(textNode);
    }
    detach(text) {
        text[val].return();
    }
}
