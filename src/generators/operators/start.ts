import { clone } from './clone';
import { HasAsyngIterator } from '../extended-async-generator';

export function start<T>(source: HasAsyngIterator<T>, value: T): AsyncGenerator<T> {
  const generator = clone(source);
  const next = generator.next;
  generator.next = function() {
    this.next = next;
    return Promise.resolve(<IteratorResult<T>> { value, done: false });
  };
  return generator;
}