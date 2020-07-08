import { DONE } from '../extended-async-generator'
import { isAsyncGenerator } from './is'

export const FINISHED: AsyncGenerator<any, void, any> = <any>{
  next: () => new Promise(() => {}),
  return: () => DONE,
  throw: () => DONE,
  [Symbol.asyncIterator]() {
    return this
  },
}

export function trigger<T, U, R>(source: AsyncGenerator<T>, generator: AsyncGenerator<R>): AsyncGenerator<R, any, any>
export function trigger<T, U, R>(source: AsyncGenerator<T>, factory: (v: U) => AsyncGenerator<R>): AsyncGenerator<R, any, any>

export async function* trigger<T, U, R>(source: AsyncGenerator<T>, emitter): AsyncGenerator<R, any, any> {
  let target = FINISHED
  const build: (v: U) => AsyncGenerator<R> = isAsyncGenerator(emitter) ? () => emitter : emitter
  const empty: (...arg) => R[] = () => []
  while (source !== FINISHED || target !== FINISHED) {
    yield* await Promise.race([
      source.next().then(({ value, done }) => (done ? empty((source = FINISHED)) : empty(target.return(), (target = build(value))))),
      target.next().then(({ value, done }) => (done ? empty((target = FINISHED)) : [value])),
    ])
  }
}
