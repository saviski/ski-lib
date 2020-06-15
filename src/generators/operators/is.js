export function isAsyncGenerator(v) {
    return v instanceof Object && Symbol.asyncIterator in v;
}
