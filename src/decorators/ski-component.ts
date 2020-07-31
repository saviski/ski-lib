import Ski from '../ski-all'

export const skicomponent = <T extends Function>(target: T): T =>
  class extends (<any>target) {
    ski?: Ski

    connectedCallback() {
      super['connectedCallback']?.()
      if (!this.ski) this.ski = new Ski(this.shadowRoot!, this)
      this.ski.init()
    }

    disconnectedCallback() {
      this.ski?.disconnect()
    }
  } as any
