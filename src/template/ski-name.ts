import { Rule } from '../core/ski-rule';
import SkiAttributeObserver from '../core/ski-attribute-observer';
import '../core/ski-data';

export default class SkiName extends SkiAttributeObserver {

  constructor(root: Node, name = '#', rule = Rule.PREFIX) {
    super(root, name, rule);
  }

  update(attr: Attr, target: string) {
    // TODO: find a better way of handling "attr.processed"
    if (!attr.processed) {
      this.root.skidata[target] = attr.ownerElement!;//.events;
      attr.processed = true;
      // attr.ownerElement!.removeAttributeNode(attr)
    }
  }

  detach(_attr: Attr, target: string) {
    this.root.skidata[target].return();
  }
  
}