export declare const FINISHED: AsyncGenerator<any, void, any>;
export declare function trigger<T, U, R>(source: AsyncGenerator<T>, build: (v: U) => AsyncGenerator<R>): AsyncGenerator<R, any, any>;
