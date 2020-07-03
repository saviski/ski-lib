import { clone } from './clone'

export async function * until<T>(source: AsyncGenerator<T>, next: Promise<any>): AsyncGenerator<T> {
  const generator = clone(source);
  next.then(v => generator.return(v))
  yield* generator
}