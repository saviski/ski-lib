export const define = (name: string): ClassDecorator => <T extends Function>(
  elementclass: T
) => customElements.define(name, <typeof HTMLElement>(<any>elementclass))
