import { Rule } from './core/ski-rule'
import SkiAssociation from './template/ski-association'
import SkiClass from './template/ski-class'
import SkiVal from './template/ski-val'
import SkiIf from './template/ski-if'
import SkiLet from './template/ski-let'
import SkiUnless from './template/ski-unless'
import SkiRepeat from './template/ski-repeat'
import SkiSwitch from './template/ski-switch'
import SkiEventTrigger from './template/ski-event-trigger'
import SkiTemplateString from './template/ski-template-string'
import SkiName from './template/ski-name'
import SkiInlineExpression from './template/ski-inline-expression'
import SkiNodeObserver from './core/ski-node-observer';
import SkiConditionalAttribute from './template/ski-conditional-attribute';
import SkiRelativeUri from './template/ski-relative-uri';

import './core/ski-data'
import './generators/extensions'
import './generators/events/dom-events'

export default class SkiAll {
  
  private all: SkiNodeObserver[];

  constructor(root: Node, data?: Readonly<object>) {
    this.all = [
      new SkiName(root, '#', Rule.PREFIX),
      new SkiLet(root, data, 'let-', Rule.PREFIX),
      new SkiRepeat(root, 'for', 'of'),
      new SkiAssociation(root, ':', Rule.SUFFIX),
      new SkiClass(root, '.', Rule.PREFIX),
      new SkiIf(root, 'if', 'else'),
      new SkiUnless(root, 'unless', 'else'),
      new SkiSwitch(root, 'switch', 'case', 'default'),
      new SkiVal(root, 'val'),
      new SkiConditionalAttribute(root, '?', Rule.SUFFIX),
      new SkiRelativeUri(root, 'relative-', Rule.PREFIX),
      // new SkiTemplateString(root, '`', Rule.SURROUNDING),
      // new SkiInlineExpression(root, '{{', '}}'),
      new SkiEventTrigger(root, '|')
    ];
  }

  init() {
    this.all.forEach(e => e.init())
  }

  disconnect() {
    this.all.forEach(e => e.disconnect())
  }

}