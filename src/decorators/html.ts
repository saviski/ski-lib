import htmlMixin from '../mix/with/html'

export const html = (
  template: TemplateStringsArray,
  ...substitutions: any[]
): ClassDecorator => htmlMixin(String.raw(template, ...substitutions))
