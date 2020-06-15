import { cachedNext } from './cached-next';
import { DONE } from '../extended-async-generator';
export function clone(source) {
    const cached = cachedNext(source[Symbol.asyncIterator]());
    let result;
    const done = new Promise((resolve, reject) => {
        result = {
            next: () => Promise.race([cached.next(), done]),
            return: () => (resolve(), DONE),
            throw: () => (reject(), DONE),
            [Symbol.asyncIterator]() { return this; }
        };
    });
    return result;
}
