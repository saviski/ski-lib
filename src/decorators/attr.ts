import { ElementWithAttributes } from './../mix/with/attributes'
import attributes from '../mix/with/attributes'
import { inject } from '../mix/in.js'

type NotStringAttr = 'only string type is allowed for attributes'

export const attr = <T extends Object, K extends keyof T>(
  prototype: T,
  property: T[K] extends string ? string & K : NotStringAttr,
  value?: string
) => {
  const elementClass: ElementWithAttributes = <any>prototype.constructor
  if (!elementClass.attributes) inject(prototype, attributes({}))
  elementClass.attributes[property] = value
}
