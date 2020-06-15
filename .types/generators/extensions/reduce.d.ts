declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, index?: number): ExtendedAsyncGenerator<U>;
    }
}
export {};
