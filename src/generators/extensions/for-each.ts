import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { forEach } from '../operators/for-each'

declare module '../extended-async-generator' {

  interface ExtendedAsyncGenerator<T> {
    forEach(next: (v: T, index: number) => any, index?: number);
  }
  
}

ExtendedAsyncGenerator.prototype.forEach = function(next, index) {
  forEach(this, next, index);
}