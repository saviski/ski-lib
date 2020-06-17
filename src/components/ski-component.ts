import { importModuleContent } from './import-module-content'
import SkiProperty from '../core/ski-property'
import SkiAll from '../ski-all';

class SkiComponent extends HTMLElement {

  private content: DocumentFragment;
  private basepath = new URL(location.origin);

  constructor() {
    super();
    if (this.firstElementChild instanceof HTMLTemplateElement)
      this.content = this.firstElementChild.content;
    else {
      this.content = document.createDocumentFragment();
      this.content.append(...this.childNodes);
    }
    const name = this.getAttribute('name')!;
    const extendsComponent = this.getAttribute('extends');
    this.createComponent(name, extendsComponent);
  }

  async createComponent(name: string, extendsComponent?: string | null) {

    const baseComponent: typeof HTMLElement = extendsComponent ? (
      await customElements.whenDefined(extendsComponent), 
        await customElements.get(extendsComponent)) : 
          HTMLElement;

    const modules: { default?: any } = await Array.from(
      this.content.querySelectorAll<HTMLScriptElement>('script[type=module]'))
        .map(module => module.src ?
          import(new URL(module.src, this.basepath).href) : 
            importModuleContent(module.innerHTML, this.basepath))
              .reduce(async (modules, module) => Object.assign(await modules, await module), 
                Promise.resolve({}));

    createComponent(name, this.content, baseComponent, modules.default);
  }
  
}

export function initSkiComponent(name = 'ski-component') {
  window.customElements.get(name) || customElements.define(name, SkiComponent);
}

function createComponent(name: string, content: DocumentFragment,
  baseComponent: typeof HTMLElement, objectClass?: typeof Object & { properties: object }) {
    
  const attributes = Object.keys(objectClass?.properties ?? {});

  const component = class extends baseComponent {

    properties: Record<string, SkiProperty>
    ski?: SkiAll

    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.append(content.cloneNode(true))
      Object.assign(shadowRoot.skidata, this.properties = this.buildProperties())
    }

    private buildProperties() {
      let object = objectClass ? new objectClass(this) : {}
      let properties = Object.fromEntries(
        attributes.map(
          name => [name, SkiProperty.wrap(this, name)]))
      Object.defineProperties(object, properties)
      return properties
    }

    connectedCallback() {
      this.ski = new SkiAll(this.shadowRoot!, this.skidata)
      this.ski.init()
    }

    disconnectedCallback() {
      this.ski?.disconnect()
    }

    static observedAttributes = attributes

    attributeChangedCallback(name, _oldValue, newValue) {
      this.properties[name].set(newValue)
    }

  }

  customElements.define(name, component);
}