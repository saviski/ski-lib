import { __asyncValues, __awaiter } from "tslib";
import SkiAttributeObserver from './ski-attribute-observer';
import SkiDependencyEval from './ski-dependency-eval';
export default class SkiAttributeEvaluation extends SkiAttributeObserver {
    update(attr, target) {
        if (!attr.processed) {
            let element = attr.ownerElement;
            Object.assign(attr.skidata, this.prepare(element, attr));
            this.evaluate(element, attr, target, attr.value);
            attr.processed = true;
        }
    }
    detach(attr) {
        attr.skidata.result.return();
    }
    evaluate(element, attr, propertyChain, expression) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = new SkiDependencyEval(expression, element, attr.skidata).run();
            attr.skidata.result = result;
            try {
                for (var result_1 = __asyncValues(result), result_1_1; result_1_1 = yield result_1.next(), !result_1_1.done;) {
                    let data = result_1_1.value;
                    this.apply(element, propertyChain, data, attr);
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
    attrSkiData(element, name) {
        return element.attributes[name].skidata;
    }
    prepare(_element, _attr) {
        return {};
    }
    ;
}
