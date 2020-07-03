import { importScript } from './import-module-content'
import SkiComponent from './ski-component'
import { mix } from '../extras/mix'
import attributes from '../extras/attributes'

class SkiTemplateComponent extends HTMLElement {
  private content: DocumentFragment

  component?: typeof SkiComponent

  constructor() {
    super()
    if (this.firstElementChild instanceof HTMLTemplateElement) this.content = this.firstElementChild.content
    else {
      this.content = document.createDocumentFragment()
      this.content.append(...this.childNodes)
    }
    const name = this.getAttribute('name')!
    const extendsComponent = this.getAttribute('extends')
    this.createComponent(name, extendsComponent!)
  }

  get templateAttributes() {
    return Object.fromEntries(
      this.getAttribute('attributes')
        ?.split(/,?\s+/)
        .map(name => [name, undefined]) ?? []
    )
  }

  async createComponent(name?: string, extendsComponent?: string) {
    const baseURI = this.parentElement?.baseURI ?? document.baseURI

    const modules = await Promise.all(
      Array.from(this.content.querySelectorAll<HTMLScriptElement>('script')).map(module => (module.remove(), importScript(module, baseURI)))
    ).then(list => Object.assign({}, ...list))

    const componentClass: typeof SkiComponent = modules.default || (await this.createClass(extendsComponent))
    componentClass.content = this.content
    componentClass.baseURI = baseURI
    customElements.define(name || componentClass.is, componentClass)
    this.component = componentClass
  }

  async createClass(extendsComponent?: string) {
    const baseComponent: typeof SkiComponent = extendsComponent
      ? (await customElements.whenDefined(extendsComponent), await customElements.get(extendsComponent))
      : SkiComponent

    return class extends mix(baseComponent).with(attributes(this.templateAttributes)) {}
  }
}

export function initSkiComponent(name = 'ski-component') {
  customElements.get(name) || customElements.define(name, SkiTemplateComponent)
}
