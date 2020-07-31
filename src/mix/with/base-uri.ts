import { Mixin } from '../in.js'

const baseURI = (value: string): Mixin<{}> => (superclass: any) =>
  class extends superclass {
    attachShadow(init: ShadowRootInit) {
      const root = super.attachShadow(init)
      Object.defineProperty(root, 'baseURI', { value })
      return root
    }
  } as any

export default baseURI
