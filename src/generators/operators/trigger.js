import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { DONE } from '../extended-async-generator';
export const FINISHED = {
    next: () => new Promise(() => { }),
    return: () => DONE,
    throw: () => DONE,
    [Symbol.asyncIterator]() { return this; }
};
export function trigger(source, build) {
    return __asyncGenerator(this, arguments, function* trigger_1() {
        let target = FINISHED;
        const empty = () => [];
        while (source !== FINISHED || target !== FINISHED) {
            yield __await(yield* __asyncDelegator(__asyncValues(yield __await(Promise.race([
                source.next().then(({ value, done }) => done ? empty(source = FINISHED) : empty(target.return(), target = build(value))),
                target.next().then(({ value, done }) => done ? empty(target = FINISHED) : [value])
            ])))));
        }
    });
}
