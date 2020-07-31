export const cached = <T extends Object>(prototype: T, property: string | symbol) => {
  const original = Object.getOwnPropertyDescriptor(prototype, property)!

  Object.defineProperty(prototype, property, {
    get(this: T) {
      const value = original.get!()

      Object.defineProperty(this, property, {
        get: () => value,
        configurable: true,
        enumerable: original.enumerable,
      })
    },
  })
}
