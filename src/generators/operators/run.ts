export async function* run<T>(source: AsyncGenerator<T>, callback: (value: T, index: number) => any, index = 0): AsyncGenerator<T> {
  for await (const value of source) {
    callback(value, index++)
    yield value
  }
}
