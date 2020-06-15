export async function * reduce<T, U>(source: AsyncGenerator<T>, callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, index = 0): AsyncGenerator<U> {
  let previous = (await source.next()).value;
  for await (const value of source)
    yield previous = callbackfn(previous, value, index++);
}