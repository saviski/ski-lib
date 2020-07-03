export function lazyProxy<T = any>(builder: (property: string) => T, setter?: (property: string, value: any) => any): Record<string, T> {
  return new Proxy(
    {},
    {
      has: (_, property) => typeof property == 'string',

      get(_target, property) {
        if (property in this) return this[property]
        if (typeof property == 'string') {
          return (this[property] = builder(property))
        }
      },

      set(_target, property, value) {
        return setter?.(property.toString(), value)
      },
    }
  )
}
