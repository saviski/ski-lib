import { Rule } from './core/ski-rule';
import SkiAssociation from './template/ski-association';
import SkiClass from './template/ski-class';
import SkiVal from './template/ski-val';
import SkiIf from './template/ski-if';
import SkiLet from './template/ski-let';
import SkiUnless from './template/ski-unless';
import SkiRepeat from './template/ski-repeat';
import SkiSwitch from './template/ski-switch';
import SkiEventTrigger from './template/ski-event-trigger';
import SkiName from './template/ski-name';
import './core/ski-data';
import './generators/index';
import './generators/events/dom-events';
export default class SkiAll {
    constructor(root, data = {}) {
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
            // new SkiTemplateString(root, '`', Rule.SURROUNDING),
            // new SkiInlineExpression(root, '{{', '}}'),
            new SkiEventTrigger(root, '|')
        ];
    }
    init() {
        this.all.forEach(e => e.init());
    }
    disconnect() {
        this.all.forEach(e => e.disconnect());
    }
}
