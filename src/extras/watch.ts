// define this get/set pair so { ...obj } works
const lookUp = (object: any, key: PropertyKey) =>
  delete object[key] &&
  Object.defineProperty(object, key, {
    get() {
      return this.__proto__[key]
    },
    set(v) {
      this.__proto__[key] = v
    },
    enumerable: true,
    configurable: true,
  })

/**
 * Watch object changes even for undefined properties
 * Removes original object properties, modifies the original object __proto__
 * to a proxy that will intercept the changes
 */
export const watch = (
  object: object,
  onChange: (property: PropertyKey, value) => void
) => {
  let ownProperties = { ...object }
  for (const key of Object.keys(object)) lookUp(object, key)

  Object.setPrototypeOf(
    object,
    new Proxy(Object.setPrototypeOf(ownProperties, Object.getPrototypeOf(object)), {
      set(target, property, value, receiver) {
        Reflect.set(target, property, value) && onChange(property, value)
        Object.getOwnPropertyDescriptor(receiver, property) || lookUp(receiver, property)
        return true
      },
    })
  )
}
