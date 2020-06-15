import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { filter, filterValue } from '../operators/filter'
import { from } from './from';

declare module '../extended-async-generator' {

  interface ExtendedAsyncGenerator<T> {
    filter<U>(next?: (v: T, index: number) => boolean, index?: number): ExtendedAsyncGenerator<U>;
    filter<U extends T>(next?: (v: T, index: number) => v is U,  index?: number): ExtendedAsyncGenerator<U>;
    filter<U extends T>(value: U): ExtendedAsyncGenerator<U>;
  }
  
}

ExtendedAsyncGenerator.prototype.filter = function(test, index?) {
  return from(typeof test == 'function' ? filter(this, test, index) : filterValue(this, test));
}