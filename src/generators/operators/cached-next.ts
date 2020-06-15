export function cachedNext<T>(source: AsyncGenerator<T>): AsyncGenerator<T> {
  let cached: Promise<IteratorResult<T>>;
  const getNext = () => cached = source.next().then(link);
  const link = (value: IteratorResult<T>) => { 
    !value.done && getNext();
    return value;
  };
  return {
    throw: source.throw,
    return: source.return,
    [Symbol.asyncIterator]: source[Symbol.asyncIterator],
    next: () => cached ?? getNext()
  };
}