export declare function find<T, S extends T>(source: AsyncGenerator<T>, predicate: (value: T, index: number) => value is S, index?: number): Promise<S>;
