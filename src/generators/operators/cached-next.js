export function cachedNext(source) {
    let cached;
    const getNext = () => cached = source.next().then(link);
    const link = (value) => {
        !value.done && getNext();
        return value;
    };
    return {
        throw: source.throw,
        return: source.return,
        [Symbol.asyncIterator]: source[Symbol.asyncIterator],
        next: () => (cached !== null && cached !== void 0 ? cached : getNext())
    };
}
