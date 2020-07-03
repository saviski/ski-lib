import { importAllComponents } from './components/import-component'
import SkiComponent from './components/ski-component'
import { initSkiComponent } from './components/ski-template-component'
import './core/ski-data'
import { Rule } from './core/ski-rule'
import attributes from './extras/attributes'
import { initBaseUrl } from './extras/base-url'
import elements from './extras/elements'
import { mix, mixwith } from './extras/mix'
import observables from './extras/observables'
import { tokenList } from './extras/token-list'
import './generators/events/dom-events'
import EventGenerator, { EventMap } from './generators/events/dom-events'
import { ExtendedAsyncGenerator } from './generators/extended-async-generator'
import './generators/extensions'
import SkiAll from './ski-all'
import SkiAssociation from './template/ski-association'
import SkiClass from './template/ski-class'
import SkiEventTrigger from './template/ski-event-trigger'
import SkiIf from './template/ski-if'
import SkiInlineExpression from './template/ski-inline-expression'
import SkiLet from './template/ski-let'
import SkiName from './template/ski-name'
import SkiRepeat from './template/ski-repeat'
import SkiSwitch from './template/ski-switch'
import SkiTemplateString from './template/ski-template-string'
import SkiUnless from './template/ski-unless'
import SkiVal from './template/ski-val'

function skiInit(root: Node, data: Readonly<object> = {}) {
  initSkiComponent('ski-component')
  importAllComponents(document.head, 'ski-component')
  initBaseUrl()
  return new SkiAll(root, data).init()
}

export {
  attributes,
  elements,
  EventGenerator,
  EventMap,
  ExtendedAsyncGenerator,
  initSkiComponent,
  mix,
  mixwith,
  observables,
  Rule,
  SkiAssociation,
  SkiClass,
  SkiComponent,
  SkiEventTrigger,
  SkiIf,
  skiInit,
  SkiInlineExpression,
  SkiLet,
  SkiName,
  SkiRepeat,
  SkiSwitch,
  SkiTemplateString,
  SkiUnless,
  SkiVal,
  tokenList,
}
