declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        current: Promise<IteratorResult<T>>;
    }
}
export {};
