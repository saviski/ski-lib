import './core/ski-data'
import './generators/index'
import './generators/events/dom-events'
import SkiAll from './ski-all';
import { initSkiComponent } from './components/ski-component';

export function skiInit(root: Node, data: Readonly<object> = {}) {
  initSkiComponent('ski-component')
  return new SkiAll(root, data).init();
}

export { Rule } from './core/ski-rule'
export { default as SkiAssociation } from './template/ski-association'
export { default as SkiClass } from './template/ski-class'
export { default as SkiVal } from './template/ski-val'
export { default as SkiIf } from './template/ski-if'
export { default as SkiLet } from './template/ski-let'
export { default as SkiUnless } from './template/ski-unless'
export { default as SkiRepeat } from './template/ski-repeat'
export { default as SkiSwitch } from './template/ski-switch'
export { default as SkiEventTrigger } from './template/ski-event-trigger'
export { default as SkiName } from './template/ski-name'
export { default as SkiTemplateString } from './template/ski-template-string'
export { default as SkiInlineExpression } from './template/ski-inline-expression'
export { initSkiComponent } from './components/ski-component';
export { ExtendedAsyncGenerator } from './generators/extended-async-generator';

