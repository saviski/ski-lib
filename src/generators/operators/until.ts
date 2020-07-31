import { clone } from './clone'
import { hasAsyncGenerator } from './has'
import { HasAsyngIterator } from '../extended-async-generator.js'

export async function* until<T>(
  source: HasAsyngIterator<T>,
  ...events: Array<AsyncGenerator<any> | Promise<any>>
): AsyncGenerator<T> {
  const generator = clone(source)
  const stop = events.map(next => (hasAsyncGenerator(next) ? clone(next).next() : next))
  Promise.race(stop).then(() => generator.return(undefined))
  yield* generator
}
