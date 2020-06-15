declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        get(key: keyof T): AsyncGenerator<T[typeof key]>;
    }
}
export {};
