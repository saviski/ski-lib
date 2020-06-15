import { ExtendedAsyncGenerator } from '../extended-async-generator';
declare type Emit<T> = (value: T) => void;
export default interface AsyncGeneratorEmitter<T> extends Emit<any> {
}
export default class AsyncGeneratorEmitter<T> extends ExtendedAsyncGenerator<T> {
    private resolve;
    private emitterPromise;
    private value;
    constructor();
    [Symbol.asyncIterator](): AsyncGenerator<T, void, unknown>;
    emit(value: T): void;
}
export {};
