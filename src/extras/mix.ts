export type Constructor<T = any> = new (...args: any[]) => T

export type Mix<T, U> = T & U & Constructor<
  (T extends Constructor ? InstanceType<T> : unknown) &
    (U extends Constructor ? InstanceType<U> : unknown)>

export type Mixin<U> = <T> (superclass: T) => Mix<T, U>

export interface MixinWith<T> {
  with<U>(mixin: Mixin<U>): Mix<T, U>
  with<U, V>(a: Mixin<U>, b: Mixin<V>): Mix<Mix<T, U>, V>
  with<U, V, W>(a: Mixin<U>, b: Mixin<V>, c: Mixin<W>): Mix<Mix<Mix<T, U>, V>, W>
  with<U, V, W, X>(a: Mixin<U>, b: Mixin<V>, c: Mixin<W>, d: Mixin<X>): Mix<Mix<Mix<Mix<T, U>, V>, W>, X>
  with<U>(...mixins: Mixin<Partial<U>>[]): Mix<T, U>
}

export function mixwith<T, U>(superclass: T, mixin: Mixin<U>): Mix<T, U>
export function mixwith<T, U, V>(superclass: T, a: Mixin<U>, b: Mixin<V>): Mix<Mix<T, U>, V>
export function mixwith<T, U, V, W>(superclass: T, a: Mixin<U>, b: Mixin<V>, c: Mixin<W>): Mix<Mix<Mix<T, U>, V>, W>
export function mixwith<T, U, V, W, X>(superclass: T, a: Mixin<U>, b: Mixin<V>, c: Mixin<W>, d: Mixin<X>): Mix<Mix<Mix<Mix<T, U>, V>, W>, X>
export function mixwith<T, U>(superclass: T, ...mixins: Mixin<Partial<U>>[]): Mix<T, U>



export function mixwith(superclass: typeof Object, ...mixins: Mixin<any>[]) {
  return mixins.reduce<any>((c, mixin) => mixin(c), superclass)
}

export function mix<T>(superclass: T): MixinWith<T>{
  return {
    with: (...mixins) => mixwith(superclass, ...mixins)
  }
}