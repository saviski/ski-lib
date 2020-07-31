import { HasAsyngIterator } from '../extended-async-generator.js'

const STREAM_PROMISE = new WeakMap<HasAsyngIterator<any>, Promise<any>>()

export async function next<T>(source: HasAsyngIterator<T>): Promise<IteratorResult<T>> {
  if (!STREAM_PROMISE.has(source)) loop(source[Symbol.asyncIterator]())
  return STREAM_PROMISE.get(source)
}

async function loop(source: AsyncGenerator<any>) {
  do {
    let promise = source.next()
    STREAM_PROMISE.set(source, promise)
    var data = await promise
  } while (!data.done)
}
