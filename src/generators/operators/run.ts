import { HasAsyngIterator } from '../extended-async-generator.js'

export async function* run<T>(
  source: HasAsyngIterator<T>,
  callback: (value: T, index: number) => any,
  index = 0
): AsyncGenerator<T> {
  for await (const value of source) {
    callback(value, index++)
    yield value
  }
}
