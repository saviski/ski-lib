import { clone } from './clone';
export declare function get<T = any>(source: AsyncGenerator<T>, property: keyof T, wrap?: typeof clone): AsyncGenerator<T[typeof property]>;
