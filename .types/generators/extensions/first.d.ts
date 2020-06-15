declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        first: Promise<T>;
    }
}
export {};
