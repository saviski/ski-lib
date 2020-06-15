declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        filter<U>(next?: (v: T, index: number) => boolean, index?: number): ExtendedAsyncGenerator<U>;
        filter<U extends T>(next?: (v: T, index: number) => v is U, index?: number): ExtendedAsyncGenerator<U>;
        filter<U extends T>(value: U): ExtendedAsyncGenerator<U>;
    }
}
export {};
