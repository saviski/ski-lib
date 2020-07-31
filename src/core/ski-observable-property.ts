const uninitialized = Symbol()

/**
 *  @example
 *  let prop = new SkiProperty<number>();
 *  >> for await (let value of prop) console.log('changed', value);
 *  prop.set(20);
 *  prop.set(50);
 *  >> log: changed 50
 *
 */
export default class SkiObservableProperty<T = any> {
  private resolveNext!: (value: T) => void
  private promise = this.newPromise()

  constructor(public currentValue: T | typeof uninitialized = uninitialized) {}

  private newPromise() {
    return new Promise<T>(resolve => (this.resolveNext = resolve))
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T, never, void> {
    if (this.currentValue !== uninitialized) yield this.currentValue
    while (true) yield await this.nextValue()
  }

  async nextValue() {
    await this.promise
    return <T>this.currentValue
  }

  get = () => (this.currentValue !== uninitialized ? this.currentValue : undefined!)

  set = (value: T) => {
    if (value !== this.currentValue) {
      this.resolveNext((this.currentValue = value))
      this.promise = this.newPromise()
    }
    return this
  }

  update(callback: (value: T) => T) {
    this.set(callback(this.get()))
  }

  async watch(callback: (value: T) => void) {
    for await (const value of this) callback(value)
  }
}
