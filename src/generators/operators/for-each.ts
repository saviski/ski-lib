import { HasAsyngIterator } from '../extended-async-generator.js'

export async function forEach<T, U>(
  source: HasAsyngIterator<T>,
  next: (v: T, index: number) => U,
  index = 0
) {
  for await (const value of source) next(value, index++)
}
