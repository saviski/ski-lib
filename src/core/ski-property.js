import { __asyncGenerator, __await, __awaiter } from "tslib";
const uninitialized = Symbol();
/**
 *  @example
 *  let prop = new SkiProperty<number>();
 *  >> for await (let value of prop) console.log('changed', value);
 *  prop.set(20);
 *  prop.set(50);
 *  >> log: changed 50
 *
 */
export default class SkiProperty {
    constructor(currentValue = uninitialized) {
        this.currentValue = currentValue;
        this.promise = this.newPromise();
        this.get = () => this.currentValue != uninitialized ? this.currentValue : undefined;
        this.set = (value) => {
            if (value !== this.currentValue) {
                this.resolveNext(this.currentValue = value);
                this.promise = this.newPromise();
            }
            return this;
        };
        this.enumerable = true;
        this.configurable = true;
    }
    newPromise() {
        return new Promise(resolve => this.resolveNext = resolve);
    }
    [Symbol.asyncIterator]() {
        return __asyncGenerator(this, arguments, function* _a() {
            if (this.currentValue !== uninitialized)
                yield yield __await(this.currentValue);
            while (true)
                yield yield __await(yield __await(this.next()));
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.promise;
            return this.currentValue;
        });
    }
    static wrap(object, name) {
        let descriptor = Object.getOwnPropertyDescriptor(object, name);
        let property = descriptor && SkiProperty.map.get(descriptor);
        if (!property) {
            property = new SkiProperty(object[name]);
            Object.defineProperty(object, name, property);
            descriptor = Object.getOwnPropertyDescriptor(object, name);
            SkiProperty.map.set(descriptor, property);
        }
        return property;
    }
}
SkiProperty.map = new WeakMap();
