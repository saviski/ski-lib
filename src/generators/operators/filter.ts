import { HasAsyngIterator } from '../extended-async-generator.js'

export async function* filter<T, S extends T>(
  source: HasAsyngIterator<T>,
  test: (value: T, index: number) => boolean = Boolean,
  index = 0
): AsyncGenerator<S> {
  for await (const value of source) if (test(value, index++)) yield <S>value
}

export async function* filterValue<T, S extends T>(
  source: HasAsyngIterator<T>,
  filterValue: S
): AsyncGenerator<S> {
  for await (const value of source) if (value == filterValue) yield <S>value
}
