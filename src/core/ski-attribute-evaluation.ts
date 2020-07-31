import SkiAttributeObserver from './ski-attribute-observer'
import { TypedSkiData } from './ski-data'
import SkiObservableExpresion from '../eval/ski-observable-expression.js'

export default abstract class SkiAttributeEvaluation<
  T = Record<string, any>
> extends SkiAttributeObserver {
  update(attr: Attr & TypedSkiData<T>, target: string) {
    if (!attr.processed) {
      let element = attr.ownerElement!
      Object.assign(attr.skidata, this.prepare(element, attr))
      this.evaluate(element, attr, target, attr.value)
      attr.processed = true
      // attr.ownerElement!.removeAttributeNode(attr)
    }
  }

  detach(attr: Attr) {
    attr.skidata.result.return()
  }

  protected async evaluate(
    element: Element,
    attr: Attr,
    propertyChain: string,
    expression: string
  ) {
    const result = new SkiObservableExpresion(expression, element).run(attr.skidata)
    attr.skidata.result = result

    for await (let data of result) this.apply(element, propertyChain, data, attr)
  }

  protected attrSkiData(element: Element, name: string): T {
    return element.attributes[name].skidata
  }

  protected prepare(_element: Element, _attr: Attr): T {
    return <T>{}
  }

  protected abstract apply(
    element: Element,
    target: string,
    data: any,
    attr: Attr & TypedSkiData<T>
  )
}
