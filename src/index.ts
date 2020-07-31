import { onchange } from './decorators/onchange'
import { observe } from './decorators/observable'
import { ImportComponent, registerComponentImporter } from './components/import-component'
import SkiComponent from './components/ski-component'
import { registerSkiComponent } from './components/ski-template-component'
import './core/ski-data'
import SkiProperty from './core/ski-property'
import { Rule } from './core/ski-rule'
import { attr } from './decorators/attr'
import { cssprop } from './decorators/cssprop'
import { define } from './decorators/define'
import { element, elementid } from './decorators/element'
import { html } from './decorators/html'
import { skicomponent } from './decorators/ski-component'
import './generators/events/dom-events'
import EventGenerator, { EventMap } from './generators/events/dom-events'
import { ExtendedAsyncGenerator } from './generators/extended-async-generator'
import './generators/extensions'
import { mix, mixwith } from './mix/in'
import attributes from './mix/with/attributes'
import cssProperties from './mix/with/css-properties'
import elements from './mix/with/elements'
import observable from './mix/with/observables'
import Ski from './ski-all'
import SkiAssociation from './template/ski-association'
import SkiClass from './template/ski-class'
import SkiCSSProperty from './template/ski-css-properties'
import SkiEventTrigger from './template/ski-event-trigger'
import SkiIf from './template/ski-if'
import SkiInlineExpression from './template/ski-inline-expression'
import SkiLet from './template/ski-let'
import SkiName from './template/ski-name'
import SkiRepeat from './template/ski-repeat'
import SkiStyle from './template/ski-style'
import SkiSwitch from './template/ski-switch'
import SkiTemplateString from './template/ski-template-string'
import SkiUnless from './template/ski-unless'
import SkiVal from './template/ski-val'

const config = {
  name: '#*',
  let: 'let-*',
  for: 'for',
  of: 'of',
  set: '*:',
  style: 'style.*',
  cssvar: '--*',
  class: '.*',
  if: 'if',
  unless: 'unless',
  else: 'else',
  switch: 'switch',
  case: 'case',
  default: 'default',
  val: 'val',
  conditional: '*?',
  url: 'relative-*',
  template: '`*`',
  interpolaion: '{{*}}',
  trigger: '*|*',
  import: 'import-component',
  ski: 'ski-component',
}

function ski(root: Node, data: Readonly<object> = {}) {
  registerSkiComponent('ski-component')
  registerComponentImporter('import-component')
  return new Ski(root, data).init()
}

export {
  attr,
  attributes,
  cssProperties,
  element,
  elementid,
  elements,
  skicomponent,
  html,
  define,
  cssprop,
  EventGenerator,
  EventMap,
  ExtendedAsyncGenerator,
  ImportComponent,
  registerSkiComponent,
  registerComponentImporter,
  mix,
  mixwith,
  observable,
  Rule,
  SkiAssociation,
  SkiClass,
  SkiComponent,
  SkiCSSProperty,
  SkiEventTrigger,
  SkiIf,
  ski,
  SkiInlineExpression,
  SkiLet,
  SkiProperty,
  SkiName,
  SkiRepeat,
  SkiStyle,
  SkiSwitch,
  SkiTemplateString,
  SkiUnless,
  SkiVal,
  observe,
  onchange,
}
