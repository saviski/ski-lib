declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        start(value: T): ExtendedAsyncGenerator<T>;
    }
}
export {};
