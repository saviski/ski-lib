export declare const DONE: Promise<IteratorResult<any, any>>;
export declare type HasAsyngIterator<T> = {
    [Symbol.asyncIterator]: () => AsyncGenerator<T>;
};
export declare const AsyncGeneratorPrototype: any;
export declare abstract class ExtendedAsyncGenerator<T> implements HasAsyngIterator<T>, PromiseLike<T> {
    abstract [Symbol.asyncIterator](): AsyncGenerator<T>;
    then(onfulfilled: any, onrejected: any): Promise<any>;
}
export interface ExtendedAsyncGenerator<T> extends AsyncGenerator<T, void> {
}
