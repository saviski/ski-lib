import { __asyncGenerator, __await, __awaiter } from "tslib";
export const DONE = Promise.resolve({ value: undefined, done: true });
const AsyncGenerator = Object.getPrototypeOf((function () { return __asyncGenerator(this, arguments, function* () { }); })());
export const AsyncGeneratorPrototype = Object.getPrototypeOf(AsyncGenerator);
export class ExtendedAsyncGenerator {
    then(onfulfilled, onrejected) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                do {
                    var { value, done } = yield this.next();
                } while (!done);
                return onfulfilled(value);
            }
            catch (e) {
                onrejected(e);
            }
        });
    }
}
Object.assign(ExtendedAsyncGenerator.prototype, {
    next(arg) { return this.__asyncIterator__.next(arg); },
    return(arg) { return this.__asyncIterator__.return(arg); },
    throw(arg) { return this.__asyncIterator__.throw(arg); }
});
Object.defineProperty(ExtendedAsyncGenerator.prototype, '__asyncIterator__', {
    get() {
        Object.defineProperty(this, '__asyncIterator__', {
            value: this[Symbol.asyncIterator](),
            enumerable: false
        });
        return this.__asyncIterator__;
    },
    enumerable: false
});
