
const uninitialized = Symbol();

/**
 *  @example 
 *  let prop = new SkiProperty<number>();
 *  >> for await (let value of prop) console.log('changed', value);
 *  prop.set(20);
 *  prop.set(50);
 *  >> log: changed 50
 * 
 */
export default class SkiProperty<T = any> implements TypedPropertyDescriptor<T> {

  private resolveNext!: (value: T) => void;
  private promise = this.newPromise();

  constructor(public currentValue: T | typeof uninitialized = uninitialized) {
    
  }

  private newPromise() {
    return new Promise<T>(resolve => this.resolveNext = resolve);
  }

  async * [Symbol.asyncIterator](): AsyncGenerator<T, never, void> {
    if (this.currentValue !== uninitialized) yield this.currentValue;
    while (true) yield await this.next();
  }

  async next() {
    await this.promise;
    return <T> this.currentValue;
  }

  get = () => this.currentValue !== uninitialized ? this.currentValue : undefined!;

  set = (value: T) => {
    if (value !== this.currentValue) {
      this.resolveNext(this.currentValue = value);
      this.promise = this.newPromise();
    }
    return this;
  }

  async watch(callback: (value: T) => void) {
    for await (const value of this) callback(value);
  }

  enumerable = true

  configurable = true

  private static map = new WeakMap<PropertyDescriptor, SkiProperty>();
  
  static wrap(object: object, name: PropertyKey, value = object[name]) {
    let descriptor = Object.getOwnPropertyDescriptor(object, name);
    let property = descriptor && SkiProperty.map.get(descriptor);
    if (!property) {
      property = new SkiProperty(value);
      Object.defineProperty(object, name, property);
      let newdescriptor = Object.getOwnPropertyDescriptor(object, name)!;
      SkiProperty.map.set(newdescriptor, property);
      newdescriptor.set && property.watch(v => newdescriptor.set!(v))
    }
    return property;
  }
}