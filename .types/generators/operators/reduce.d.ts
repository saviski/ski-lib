export declare function reduce<T, U>(source: AsyncGenerator<T>, callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, index?: number): AsyncGenerator<U>;
