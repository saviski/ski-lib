import { clone } from './clone';

export function nested<T, T1,R>(source: AsyncGenerator<T>, g1: (v0: T1) => AsyncGenerator<R>): AsyncGenerator<R>;
export function nested<T, T1,T2,R>(source: AsyncGenerator<T>, g1: (v0: T1) => AsyncGenerator<T2>, g2: (v0: T1, v1: T2) => AsyncGenerator<R>): AsyncGenerator<R>;
export function nested<T, T1,T2,T3,R>(source: AsyncGenerator<T>, g1: (v0: T1) => AsyncGenerator<T2>, g2: (v0: T1, v1: T2) => AsyncGenerator<T3>, g3: (v0: T1, v1: T2, v3: T3) => AsyncGenerator<R>): AsyncGenerator<R>;
export function nested<T extends any[]>(source: AsyncGenerator<T[0]>, ...gen: Array<(...v: T) => AsyncGenerator<any>>): AsyncGenerator<T[-1]>;


export async function * nested(source: AsyncGenerator, ...sources: Array<(...v) => AsyncGenerator>): AsyncGenerator {
  let generators = [source];
  let promises: Array<Promise<IteratorResult<unknown>> | undefined> = [generators[0].next()];
  let values: any[] = [];
  
  while (promises.some(Boolean)) {
    
    let [index, value, done] = <[number, any, boolean]> await Promise.race(
      promises.map((promise, i) => 
        promise?.then(result => [i, result.value, result.done]))
          .filter(Boolean));

    if (!done || value !== undefined) {
      if (index == sources.length)
        yield value;
      else {
        values[index] = value;
        for (let next = index + 1; next <= sources.length; next++) {
          generators[next]?.return(undefined);
          promises[next] = undefined;
        }
        generators[index+1] = clone(sources[index](...values));
        promises[index+1] = generators[index+1].next();
      }
    }
    promises[index] = done ? undefined : generators[index].next();

  }
}