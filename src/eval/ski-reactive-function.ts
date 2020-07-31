import { hasAsyncGenerator } from '../generators/operators/has.js'
import { trigger } from '../generators/operators/trigger.js'

export default class SkiReactiveFunction<R = any> {
  private onchange = this.createOnChange()

  protected changed = () => {}

  constructor(private wrappedFunction: (...args) => any) {}

  public run(...args): AsyncGenerator<R> {
    return trigger(this.onchange, () => this.execute(...args))
  }

  protected async *execute(...args) {
    let result = this.wrappedFunction(...args)
    hasAsyncGenerator(result) ? yield* result : yield result
  }

  private async *createOnChange() {
    const changes = () =>
      new Promise<void>(resolve => {
        this.changed()
        this.changed = resolve
      })

    while (true) yield await changes()
  }
}
