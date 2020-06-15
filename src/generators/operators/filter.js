import { __asyncGenerator, __asyncValues, __await } from "tslib";
export function filter(source, test = Boolean, index = 0) {
    return __asyncGenerator(this, arguments, function* filter_1() {
        var e_1, _a;
        try {
            for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), !source_1_1.done;) {
                const value = source_1_1.value;
                if (test(value, index++))
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
export function filterValue(source, filterValue) {
    return __asyncGenerator(this, arguments, function* filterValue_1() {
        var e_2, _a;
        try {
            for (var source_2 = __asyncValues(source), source_2_1; source_2_1 = yield __await(source_2.next()), !source_2_1.done;) {
                const value = source_2_1.value;
                if (value == filterValue)
                    yield yield __await(value);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield __await(_a.call(source_2));
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
}
