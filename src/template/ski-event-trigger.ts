import { Rule } from '../core/ski-rule'
import SkiDependencyEval from '../core/ski-dependency-eval'
import SkiAttributeObserver from '../core/ski-attribute-observer'
import '../core/ski-data'
import EventGenerator from '../generators/events/dom-events'
import '../generators/extensions/trigger'
import '../generators/extensions/for-each'

export default class SkiEventTrigger extends SkiAttributeObserver {

  static readonly evaluationSnapshot = false;

  constructor(root: Node, private separator = '|') {
    super(root, separator, Rule.SEPARATOR);
  }

  update(attr: Attr, target: string) {
    if (!attr.processed) {
      let element = attr.ownerElement!;
      let [ listen, emit ] = this.camelCase(target).split(this.separator);
      let evaluator = new SkiDependencyEval(attr.value, element, attr.skidata);
      const emitter: EventGenerator<any> = element.events[emit];
      element.events[listen].forEach((event: Event) => {
        let copy: any = {};
        // for (const name in event) copy[name] = event[name];
        Object.assign(attr.skidata, { event }, copy);
        evaluator.run().next().then(({value}) => emitter(value));
      });
      attr.processed = true;
    }
  }

  async update_(attr: Attr, target: string) {
    if (!attr.processed) {
      const [ listen, emit ] = this.camelCase(target).split(this.separator);
      const element = attr.ownerElement!;
      const listener = element.events[listen];
      const emitter = element.events[emit];
      attr.skidata.event = listener;
      const evaluator = new SkiDependencyEval(attr.value, element, attr.skidata);
      listener.trigger(() => evaluator.run()).forEach(emitter);
      attr.processed = true;
    }
  }

  detach(attr: Attr, target: string) {
    let [ listen ] = this.camelCase(target).split(this.separator);
    let element = attr.ownerElement!;
    element.events[listen].return();
  }

}
