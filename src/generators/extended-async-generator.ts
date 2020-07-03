export const DONE = Promise.resolve<IteratorResult<any>>({ value: undefined, done: true })

export type HasAsyngIterator<T> = {
  [Symbol.asyncIterator]: () => AsyncGenerator<T>
}

const AsyncGenerator = Object.getPrototypeOf((async function* () {})())
export const AsyncGeneratorPrototype = Object.getPrototypeOf(AsyncGenerator)

export abstract class ExtendedAsyncGenerator<T> implements HasAsyngIterator<T>, PromiseLike<T> {
  abstract [Symbol.asyncIterator](): AsyncGenerator<T>

  async then(onfulfilled, onrejected) {
    try {
      do {
        var { value, done } = await this.next()
      } while (!done)
      return onfulfilled(value)
    } catch (e) {
      onrejected(e)
    }
  }
}

export interface ExtendedAsyncGenerator<T> extends AsyncGenerator<T, void> {}

Object.assign(ExtendedAsyncGenerator.prototype, <any>{
  next(arg) {
    return this.__asyncIterator__.next(arg)
  },
  return(arg) {
    return this.__asyncIterator__.return(arg)
  },
  throw(arg) {
    return this.__asyncIterator__.throw(arg)
  },
})

Object.defineProperty(ExtendedAsyncGenerator.prototype, '__asyncIterator__', {
  get() {
    Object.defineProperty(this, '__asyncIterator__', {
      value: this[Symbol.asyncIterator](),
      enumerable: false,
    })
    return this.__asyncIterator__
  },
  enumerable: false,
})
