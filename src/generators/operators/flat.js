import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { isAsyncGenerator } from './is';
export function flat(source) {
    return __asyncGenerator(this, arguments, function* flat_1() {
        var e_1, _a;
        try {
            for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), !source_1_1.done;) {
                const value = source_1_1.value;
                if (isAsyncGenerator(value))
                    yield __await(yield* __asyncDelegator(__asyncValues(value)));
                else
                    yield yield __await(value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield __await(_a.call(source_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
