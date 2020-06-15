import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { from } from './from';
import { flat } from '../operators/flat'

declare module '../extended-async-generator' {

  interface ExtendedAsyncGenerator<T> {
    flat: AsyncGenerator<T>;
  }
  
}

Object.defineProperties(ExtendedAsyncGenerator, {
  flat: {
    get() {
      return from(flat(this));
    }
  }
});