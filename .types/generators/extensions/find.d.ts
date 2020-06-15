declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        find<S extends T>(predicate: (value: T, index: number) => value is S, index?: number): Promise<S>;
    }
}
export {};
