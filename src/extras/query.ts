export function query<T>(selector: string) {
  return {
    get(this: HTMLElement) {
      return this.shadowRoot?.querySelector(selector)
    },
  }
}
