type NotElement = 'only HTML Element types are allowed for element decorator'

export const element = (query: string) => <T extends Object, K extends keyof T>(
  prototype: T,
  property: T[K] extends Element | undefined ? K : NotElement
) => {
  Object.defineProperty(prototype, property, {
    get(this: Element) {
      return this.shadowRoot?.querySelector(query)
    },
  })
}

export const elementid = <T extends Object, K extends keyof T>(
  prototype: T,
  property: T[K] extends Element | undefined ? K : NotElement
) => {
  Object.defineProperty(prototype, property, {
    get(this: Element) {
      return this.shadowRoot?.querySelector('#' + property)
    },
  })
}
