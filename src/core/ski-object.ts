export default class SkiObject {

  private resolveNext!: () => void;
  private promise!: Promise<void>;

  constructor(readonly data = {}) {
    this.nextPromise();
  }

  private nextPromise() {
    this.resolveNext?.();
    this.promise = new Promise<void>(resolve => this.resolveNext = resolve);
  }

  async * [Symbol.asyncIterator](): AsyncGenerator<object, never, void> {
    yield this.data;
    while (true) yield await this.next();
  }

  async next() {
    await this.promise;
    return this.data;
  }

  setProperty(name: string, value: any): this {
    if (this.data[name] !== value) {
      this.data[name] = value;
      this.nextPromise();
    }
    return this;
  }

  async subscribe(next: (v: object) => void) {
    for await (let v of this) next(v);
  }

  extendProperty(data: object) {
    Object.assign(this.data, data);
    this.nextPromise();
  }

  set(data: object) {
    Object.keys(this.data).forEach(key => {
      if (!(key in data)) delete this.data[key];
    });
    Object.assign(this.data, data);
    this.nextPromise();
  }

}