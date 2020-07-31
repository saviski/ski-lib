import { Mixin } from '../in.js'

const template = (content: DocumentFragment): Mixin<{ content: DocumentFragment }> => (
  superclass: any
) =>
  class extends (<any>superclass) {
    static content = content

    constructor(...args) {
      super(...args)
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
      root.append(new.target.content.cloneNode(true))
    }
  } as any

export default template
