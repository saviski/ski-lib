import { ExtendedAsyncGenerator } from '../extended-async-generator';

type Emit<T> = (value: T) => void;

export default interface AsyncGeneratorEmitter<T> extends Emit<any> {}

export default class AsyncGeneratorEmitter<T> extends ExtendedAsyncGenerator<T> {

  private resolve!: (value: T) => void;
  private emitterPromise = new Promise<T>(resolve => this.resolve = resolve);
  private value!: T;

  constructor() {
    super();
    const AsyncGeneratorEmitter: any = function (...args) { AsyncGeneratorEmitter.emit(...args) }
    return Object.setPrototypeOf(AsyncGeneratorEmitter, this);
  }

  async * [Symbol.asyncIterator]() {
    while (true) yield await this.emitterPromise.then(() => {
      this.emitterPromise = new Promise<T>(resolve => this.resolve = resolve);
      return this.value
    });
  }

  emit(value: T) {
    this.resolve(this.value = value);
  }

}