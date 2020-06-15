import { __asyncValues, __awaiter } from "tslib";
export function log(source, ...args) {
    var source_1, source_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        let index = 0;
        try {
            for (source_1 = __asyncValues(source); source_1_1 = yield source_1.next(), !source_1_1.done;) {
                const value = source_1_1.value;
                console.log(++index + 'º', ...args, value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield _a.call(source_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
