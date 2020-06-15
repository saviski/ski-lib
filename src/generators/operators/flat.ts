import { isAsyncGenerator } from './is';

export async function * flat<T>(source: AsyncGenerator<T>): AsyncGenerator<T> {
  for await (const value of source) 
  if (isAsyncGenerator(value))
    yield* <AsyncGenerator<T>> <any> value;
  else
    yield value;
}