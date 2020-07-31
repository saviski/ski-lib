import { Rule } from '../core/ski-rule'
import SkiAttributeObserver from '../core/ski-attribute-observer'
import '../core/ski-data'
import EventGenerator from '../generators/events/dom-events'
import '../generators/extensions/trigger'
import '../generators/extensions/for-each'
import SkiObservableExpresion from '../eval/ski-observable-expression.js'

export default class SkiEventTrigger extends SkiAttributeObserver {
  static readonly evaluationSnapshot = false

  constructor(root: Node, private separator = '|') {
    super(root, separator, Rule.SEPARATOR)
  }

  update(attr: Attr, target: string) {
    if (!attr.processed) {
      let element = attr.ownerElement!
      let [listen, emit] = this.camelCase(target).split(this.separator)
      let evaluator = new SkiObservableExpresion(attr.value, element)
      const emitter: EventGenerator<any> = element.events[emit]
      element.events[listen].forEach(async (event: Event) => {
        let copy: any = {}
        // for (const name in event) copy[name] = event[name];
        Object.assign(attr.skidata, { event }, copy)
        let { value } = await evaluator.run(attr.skidata).next()
        emitter(value)
      })
      attr.processed = true
      // attr.ownerElement!.removeAttributeNode(attr)
    }
  }

  detach(attr: Attr, target: string) {
    let [listen] = this.camelCase(target).split(this.separator)
    let element = attr.ownerElement!
    element.events[listen].return()
  }
}
