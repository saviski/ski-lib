const dataStore = new WeakMap<Node, object>()

export const SKIDATA_PROPERTY = 'skidata'

SKIDATA_PROPERTY in Node.prototype ||
  Object.defineProperty(Node.prototype, SKIDATA_PROPERTY, {
    get(this: Node): object {
      let data = dataStore.get(this)
      if (!data) dataStore.set(this, (data = {}))
      return this.parentNode
        ? Object.setPrototypeOf(data, this.parentNode.skidata)
        : this instanceof Attr && this.ownerElement
        ? Object.setPrototypeOf(data, this.ownerElement.skidata)
        : data
    },
  })

export interface TypedSkiData<T> {
  readonly [SKIDATA_PROPERTY]: T
}

declare global {
  interface Node extends TypedSkiData<any> {}

  interface Attr {
    processed?: boolean
  }
}
