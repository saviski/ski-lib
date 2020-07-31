import { hasAsyncGenerator } from './has'
import { HasAsyngIterator } from '../extended-async-generator.js'

export async function* flat<T>(source: HasAsyngIterator<T>): AsyncGenerator<T> {
  for await (const value of source)
    hasAsyncGenerator<T>(value) ? yield* value : yield value
}
