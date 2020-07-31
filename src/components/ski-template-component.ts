import { importScript } from './import-module-content'
import { mix } from '../mix/in'
import attributes from '../mix/with/attributes'
import template from '../mix/with/template.js'
import baseURI from '../mix/with/base-uri.js'

class SkiComponentDeclaration extends HTMLElement {
  private content: DocumentFragment

  componentClass?: typeof HTMLElement

  constructor() {
    super()
    if (this.firstElementChild instanceof HTMLTemplateElement)
      this.content = this.firstElementChild.content
    else {
      this.content = document.createDocumentFragment()
      this.content.append(...this.childNodes)
    }
    this.createComponent()
  }

  get templateAttributes() {
    return Object.fromEntries(
      this.getAttribute('attributes')
        ?.trim()
        .split(/,?\s+/)
        .map(name => [name, undefined]) ?? []
    )
  }

  get name() {
    return this.getAttribute('name') || undefined
  }

  get extends() {
    return this.getAttribute('extends') || undefined
  }

  async createComponent() {
    const componentBaseURI = this.getRootNode().baseURI

    const modules = await Promise.all(
      Array.from(this.content.querySelectorAll<HTMLScriptElement>('script')).map(
        module => (module.remove(), importScript(module, componentBaseURI))
      )
    ).then(list => Object.assign({}, ...list))

    const componentClass: typeof HTMLElement =
      modules.default || (await this.createClass(this.extends))

    const componentWithTemplate = mix(componentClass).with(
      template(this.content),
      baseURI(componentBaseURI)
    )

    customElements.define(this.name || componentClass['is'], componentWithTemplate)
    this.componentClass = componentClass
  }

  private async createClass(extendsComponent?: string) {
    const baseComponent: typeof HTMLElement = extendsComponent
      ? (await customElements.whenDefined(extendsComponent),
        await customElements.get(extendsComponent))
      : HTMLElement

    return mix(baseComponent).with(attributes(this.templateAttributes))
  }
}

export function registerSkiComponent(name = 'ski-component') {
  customElements.get(name) || customElements.define(name, SkiComponentDeclaration)
}
