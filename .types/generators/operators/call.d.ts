import { clone } from './clone';
export declare function call<T, R>(source: AsyncGenerator<T>, method: keyof T, wrap?: typeof clone, ...args: any[]): AsyncGenerator<R>;
