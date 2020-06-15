import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { from } from './from';
import { call } from '../operators/call';

declare module '../extended-async-generator' {

  interface ExtendedAsyncGenerator<T> {
    call<K extends keyof T>(key: K, ...args): AsyncGenerator<ReturnType<T[K] extends (...a) => any ? T[K] : never>>;
  }
  
}

ExtendedAsyncGenerator.prototype.call = function (key, ...args) {
  return call(this, key, from, ...args);
}