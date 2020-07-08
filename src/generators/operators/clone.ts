import { cachedNext } from './cached-next'
import { DONE, HasAsyngIterator } from '../extended-async-generator'

export function clone<T>(source: HasAsyngIterator<T>): AsyncGenerator<T> {
  const cached = cachedNext(source[Symbol.asyncIterator]())

  let result: AsyncGenerator<T>
  const done = new Promise<IteratorResult<T, void>>((resolve, reject) => {
    result = <any>{
      next: () => Promise.race([cached.next(), done]),
      return: v => (resolve(v), DONE),
      throw: r => (reject(r), DONE),
      [Symbol.asyncIterator]() {
        return this
      },
    }
  }).then(() => DONE)
  return result!
}
