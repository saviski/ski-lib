import { inject } from '../mix/in.js'
import cssProperties, { ElementWithCSSObservers } from '../mix/with/css-properties.js'

type NotStringAttr = 'only string type is allowed for css properties'

export const cssprop = <T extends Object, K extends keyof T>(
  prototype: T,
  property: T[K] extends string ? string & K : NotStringAttr,
  syntax = '*'
) => {
  const constructor: typeof ElementWithCSSObservers = <any>prototype.constructor
  if (!constructor.cssProperties) inject(prototype, cssProperties({}))
  constructor.cssProperties[property] = syntax
  constructor.defineProperty(property)
}

export const csspropsyntax = (syntax: string) => <T extends Object, K extends keyof T>(
  prototype: T,
  property: T[K] extends string ? string & K : NotStringAttr
) => cssprop(prototype, property, syntax)
