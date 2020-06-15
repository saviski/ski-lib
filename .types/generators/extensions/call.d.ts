declare module '../extended-async-generator' {
    interface ExtendedAsyncGenerator<T> {
        call<K extends keyof T>(key: K, ...args: any[]): AsyncGenerator<ReturnType<T[K] extends (...a: any[]) => any ? T[K] : never>>;
    }
}
export {};
