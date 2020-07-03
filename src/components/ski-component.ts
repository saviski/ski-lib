import SkiAll from '../ski-all'
import { mix, MixinWith } from '../extras/mix'

const camelCase = (name: string) => name.replace(/-([a-z])/g, g => g[1].toUpperCase())

const dashCase = (name: string) => name.replace(/([A-Z])/g, '-$1').toLowerCase()
export default class SkiComponent extends HTMLElement {
  static content = document.createDocumentFragment()

  static is: string

  static baseURI: string = document.baseURI

  private ski?: SkiAll

  // protected attr: Record<string, SkiProperty> = {}

  constructor(..._args) {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.append(new.target.content.cloneNode(true))
    Object.assign(root.skidata, { baseURI: new.target.baseURI })
  }

  init(_component: Node) {}

  connectedCallback() {
    Object.assign(this.shadowRoot!.skidata, this)
    this.ski = new SkiAll(this.shadowRoot!)
    this.ski.init()
    this.init(this.shadowRoot!)
  }

  disconnectedCallback() {
    this.ski?.disconnect()
  }

  static with: MixinWith<typeof SkiComponent>['with'] = mix(SkiComponent).with

  // static with_<A extends object>(mixin: A, baseclass: typeof SkiComponent = SkiComponent): Mixin<SkiComponent, A> {
  //   let attributes = Object.assign(<any> {}, baseclass.attributes, mixin)
  //   return <any> class extends baseclass {

  //     static attributes = attributes

  //     static observedAttributes = Object.keys(attributes).map(dashCase)

  //     constructor() {
  //       super()
  //       for (const [name, value] of Object.entries(attributes)) {
  //         this.attr[name] = SkiProperty.wrap(this, name, this[name] || value)
  //         this.attr[name].watch(newvalue => this.setAttribute(name, newvalue.toString()))
  //       }
  //     }

  //     attributeChangedCallback(name: string, oldValue: any, newValue: any) {
  //       oldValue != newValue && this.attr[camelCase(name)].set(newValue)
  //     }

  //   }
  // }
}
