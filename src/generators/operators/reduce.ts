export async function* reduce<T, U>(
  source: AsyncGenerator<T>,
  callbackfn: (previousValue: U, currentValue: T) => U,
  initial?: T
): AsyncGenerator<U> {
  let previous = initial ?? (await source.next()).value
  for await (const value of source) yield (previous = callbackfn(previous, value))
}
