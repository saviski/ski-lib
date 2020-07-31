import { observableProperty, isObservable } from './../core/ski-observable-object'
import { HasAsyngIterator } from './../generators/extended-async-generator'
import { UNINITIALIZED } from '../generators/operators/most-recent.js'
import { hasAsyncGenerator } from '../generators/operators/has.js'
import { mostRecent } from '../generators/operators/most-recent.js'
import SkiProxyFunction from './ski-proxy-function.js'
import { forEach } from '../generators/operators/for-each.js'
import { next } from '../generators/operators/next.js'

export default class SkiObservableFunction<T extends object> extends SkiProxyFunction<T> {
  private dependencies = new Set<HasAsyngIterator<any>>()

  protected async *execute(...args) {
    try {
      const result = super.execute(...args)
      this.await()
      yield* result
    } catch (error) {
      if (error !== UNINITIALIZED) throw error
    }
  }

  await() {
    const changes = Array.from(this.dependencies).map(source => next(source))
    // this.dependencies.clear()
    Promise.race(changes).then(() => this.changed())
  }

  getValue(target: any, property, receiver: any) {
    let value = Reflect.get(target, property, receiver)

    if (isObservable(target)) {
      this.watch(observableProperty(target, property)!)
    } else if (hasAsyncGenerator(value)) {
      this.watch(value)
      value = mostRecent(value)
    }

    return value
  }

  watch(source: HasAsyngIterator<unknown>) {
    if (!this.dependencies.has(source)) {
      this.dependencies.add(source)
      forEach(source, () => this.changed())
    }
  }
}
