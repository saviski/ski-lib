declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        trigger<R>(factory: (v: T) => AsyncGenerator<R>): ExtendedAsyncGenerator<R>;
    }
}
export {};
