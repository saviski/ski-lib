export function first<T>(source: AsyncGenerator<T>): Promise<T> {
  return source.next().then(({ value }) => <T>value)
}
