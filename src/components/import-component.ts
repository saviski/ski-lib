import '../extras/request-document'

const imports = new Set<string>()

export function registerComponentImporter(name: string) {
  customElements.define(name, ImportComponent)
}

export class ImportComponent extends HTMLElement {
  async connectedCallback() {
    if (!this.getAttribute('src')) throw Error(this.tagName + ' src tag is required')
    let root = this.attachShadow({ mode: 'open' })
    this.import(root)
  }

  get baseURI() {
    let src = this.getAttribute('src')
    return new URL(src!, this.getRootNode().baseURI).href
  }

  async import(container: ShadowRoot) {
    let base = document.createElement('base')
    base.href = this.baseURI

    if (imports.has(base.href)) return

    try {
      const response = await fetch(base.href)
      const content = await response.document()
      document.head.prepend(base)
      container.append(content)
      imports.add(base.href)
    } catch (e) {
      throw new Error(`${e}\n\tat <${this.tagName}> src ('${base.href}')`)
    } finally {
      base.remove()
    }
  }
}
