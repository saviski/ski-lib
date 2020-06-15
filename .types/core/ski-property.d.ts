declare const uninitialized: unique symbol;
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
    currentValue: T | typeof uninitialized;
    private resolveNext;
    private promise;
    constructor(currentValue?: T | typeof uninitialized);
    private newPromise;
    [Symbol.asyncIterator](): AsyncGenerator<T, never, void>;
    next(): Promise<T>;
    get: () => T;
    set: (value: T) => this;
    enumerable: boolean;
    configurable: boolean;
    private static map;
    static wrap(object: object, name: PropertyKey): SkiProperty<any>;
}
export {};
