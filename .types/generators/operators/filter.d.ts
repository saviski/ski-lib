export declare function filter<T, S extends T>(source: AsyncGenerator<T>, test?: (value: T, index: number) => boolean, index?: number): AsyncGenerator<S>;
export declare function filterValue<T, S extends T>(source: AsyncGenerator<T>, filterValue: S): AsyncGenerator<S>;
