import { __asyncGenerator, __await } from "tslib";
import { ExtendedAsyncGenerator } from '../extended-async-generator';
export default class AsyncGeneratorEmitter extends ExtendedAsyncGenerator {
    constructor() {
        super();
        this.emitterPromise = new Promise(resolve => this.resolve = resolve);
        const AsyncGeneratorEmitter = function (...args) { AsyncGeneratorEmitter.emit(...args); };
        return Object.setPrototypeOf(AsyncGeneratorEmitter, this);
    }
    [Symbol.asyncIterator]() {
        return __asyncGenerator(this, arguments, function* _a() {
            while (true)
                yield yield __await(yield __await(this.emitterPromise.then(() => {
                    this.emitterPromise = new Promise(resolve => this.resolve = resolve);
                    return this.value;
                })));
        });
    }
    emit(value) {
        this.resolve(this.value = value);
    }
}
