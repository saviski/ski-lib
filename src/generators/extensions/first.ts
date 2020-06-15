import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { first } from '../operators/first';

declare module '../extended-async-generator' {

  interface ExtendedAsyncGenerator<T> {
    first: Promise<T>;
  }
  
}

Object.defineProperties(ExtendedAsyncGenerator, {
  first: {
    get() {
      return first(this);
    }
  }
});