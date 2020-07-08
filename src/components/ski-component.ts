import SkiAll from '../ski-all'
import { mix, MixinWith } from '../extras/mix'
export default class SkiComponent extends HTMLElement {
  static content = document.createDocumentFragment()

  static is: string

  static baseURI: string = document.baseURI

  static with: MixinWith<typeof SkiComponent>['with'] = mix(SkiComponent).with

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
}
