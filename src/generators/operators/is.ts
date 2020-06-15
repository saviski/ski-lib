export function isAsyncGenerator<T>(v: any): v is AsyncGenerator<T> {
  return v instanceof Object && Symbol.asyncIterator in v;
}