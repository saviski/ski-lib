import { ExtendedAsyncGenerator } from '../extended-async-generator'

declare module '../extended-async-generator' {
  interface ExtendedAsyncGenerator<T> {
    current: Promise<IteratorResult<T>>
  }
}

Object.defineProperties(ExtendedAsyncGenerator, {
  current: {
    get() {
      const set = () => (this.current = this.next().then(next))
      const next = value => set() && value
      Object.defineProperty(this, 'current', { value: null, writable: true })
      return set()
    },
  },
})
