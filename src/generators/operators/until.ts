import { clone } from './clone'
import { isAsyncGenerator } from './is'

export async function* until<T>(
  source: AsyncGenerator<T>,
  ...events: Array<AsyncGenerator<any> | Promise<any>>
): AsyncGenerator<T> {
  const generator = clone(source)
  const stop = events.map(next => (isAsyncGenerator(next) ? clone(next).next() : next))
  Promise.race(stop).then(() => generator.return(undefined))
  yield* generator
}
