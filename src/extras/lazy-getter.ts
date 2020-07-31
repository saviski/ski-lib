export const lazyGetter = <T, U extends object>(
  builder: (property) => T,
  storage: any = {},
  model: U = storage
): U =>
  new Proxy(<any>model, {
    get(_, property) {
      storage[property] ||
        (property in model ? (storage[property] = builder(property)) : undefined)
    },
  })
