import { Mixin } from '../in.js'
import template from './template.js'

const html = (innerHTML: string): Mixin<{ content: DocumentFragment }> => {
  const htmltemplate = document.createElement('template')
  htmltemplate.innerHTML = innerHTML
  return template(htmltemplate.content)
}

export default html
