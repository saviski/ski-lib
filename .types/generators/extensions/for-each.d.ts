declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        forEach(next: (v: T, index: number) => any, index?: number): any;
    }
}
export {};
