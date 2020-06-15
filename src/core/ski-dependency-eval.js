import { __asyncDelegator, __asyncGenerator, __asyncValues, __await, __awaiter } from "tslib";
import { isAsyncGenerator } from '../generators/operators/is';
import { map } from '../generators/operators/map';
class Dependency {
}
export default class SkiDependencyEval {
    constructor(expression, context, scope) {
        this.expression = expression;
        this.context = context;
        this.scope = scope;
        this.original = new Map();
        this.valueMap = new Map();
        try {
            this.function = new Function('__arg0__', `with (__arg0__) return (${this.expression || undefined})`);
        }
        catch (e) {
            throw Error(`Creating function() {\n\t${expression})\n}\n${e}`);
        }
    }
    run() {
        return __asyncGenerator(this, arguments, function* run_1() {
            do {
                this.original.clear();
                this.valueMap.clear();
                try {
                    let result = this.function.call(this.context, new Proxy(this.scope, this));
                    isAsyncGenerator(result) ?
                        yield __await(yield* __asyncDelegator(__asyncValues(this.original.get(result) || result))) :
                        yield yield __await(this.original.get(result) || result);
                }
                catch (e) {
                    if (!(e instanceof Dependency))
                        throw Error(`Evaluating expression (${this.expression})\n${e}`);
                }
                yield __await(this.deps());
            } while (this.generators().length > 0);
            this.original.clear();
            this.valueMap.clear();
        });
    }
    deps() {
        return Promise.race(this.generators().map(gen => SkiDependencyEval.generatorPromises.get(gen)));
    }
    generators() {
        return Array.from(this.valueMap.keys())
            .filter(data => isAsyncGenerator(data) && SkiDependencyEval.generatorPromises.has(data));
    }
    get dependencies() {
        return Array.from(this.valueMap.values());
    }
    get entries() {
        return new Map([...this.valueMap.entries()].map(([key, value]) => [value, key]));
    }
    proxy(data) {
        let result = new Proxy(data, this);
        this.original.set(result, data);
        return result;
    }
    register(target, property, value) {
        let chain = this.valueMap.get(target);
        this.valueMap.set(value, chain ? `${chain}.${property}` : property);
    }
    get(target, property, _receiver) {
        if (property === Symbol.unscopables)
            return target[property];
        if (!(property in target))
            throw ReferenceError(`${String(property)} is not defined in: ${target}`);
        let value = isAsyncGenerator(target) ?
            this.map(target, property) :
            target[property];
        this.register(target, String(property), value);
        if (isAsyncGenerator(value))
            value = this.generatorValue(value);
        return typeof value === 'object' ? this.proxy(value) : value;
    }
    map(generator, property) {
        const uniqueName = '__' + String(property) + '__';
        return generator[uniqueName] || (generator[uniqueName] = map(generator, v => v[property]));
    }
    generatorValue(generator) {
        if (SkiDependencyEval.generatorValues.has(generator))
            return SkiDependencyEval.generatorValues.get(generator);
        else {
            this.watchStream(generator);
            throw new Dependency();
        }
    }
    watchStream(generator) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = this.valueMap.get(generator);
            let stream = generator[Symbol.asyncIterator]();
            if (!SkiDependencyEval.generatorPromises.has(generator)) {
                try {
                    do {
                        let next = stream.next();
                        SkiDependencyEval.generatorPromises.set(generator, next);
                        var data = yield next;
                        !data.done && SkiDependencyEval.generatorValues.set(generator, data.value);
                    } while (!data.done);
                }
                finally {
                    SkiDependencyEval.generatorPromises.delete(generator);
                }
            }
        });
    }
}
SkiDependencyEval.generatorValues = new Map();
SkiDependencyEval.generatorPromises = new Map();
