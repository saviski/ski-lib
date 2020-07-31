import { HasAsyngIterator } from '../extended-async-generator'

export async function* map<T, U>(
  source: HasAsyngIterator<T>,
  next: (v: T, index: number) => U,
  index = 0
): AsyncGenerator<U> {
  for await (const value of source) yield next(value, index++)
}
