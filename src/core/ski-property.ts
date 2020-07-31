import SkiObservableProperty from './ski-observable-property.js'

export default class SkiProperty<T = any> extends SkiObservableProperty
  implements TypedPropertyDescriptor<T> {
  enumerable = true

  configurable = true

  private static map = new WeakMap<PropertyDescriptor, SkiProperty>()

  static wrap(object: object, name: PropertyKey, value = object[name]) {
    let descriptor = Object.getOwnPropertyDescriptor(object, name)
    let property = descriptor && SkiProperty.map.get(descriptor)
    if (!property) {
      property = new SkiProperty(value)
      Object.defineProperty(object, name, property)
      let newdescriptor = Object.getOwnPropertyDescriptor(object, name)!
      SkiProperty.map.set(newdescriptor, property)
      newdescriptor.set && property.watch(v => newdescriptor.set!(v))
    }
    return property
  }
}
