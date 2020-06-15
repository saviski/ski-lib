declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        map<U>(next: (v: T, index: number) => U, index?: number): ExtendedAsyncGenerator<U>;
    }
}
export {};
