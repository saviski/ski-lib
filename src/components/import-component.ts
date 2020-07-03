import './request-document'

const imports = new Set<string>()

var importBasePath = new URL(location.origin)

export const importComponent = async (path: string, rel: string, parent = document.head): Promise<any> => {
  let base = document.createElement('base');
  try {
    importBasePath = new URL(path, location.origin)
    base.href = importBasePath.href
    document.head.prepend(base)
    if (!imports.has(importBasePath.href)) {
      const content = await (await fetch(importBasePath.href)).document()
      importAllComponents(content, rel, importBasePath)
      preloadStylesheets(content, importBasePath)
      parent.append(content)
      imports.add(importBasePath.href)
      Object.defineProperty(parent, 'baseURI', { value:  base.href })
    }
  } catch(e) {
    throw new Error(`${ e }\n\tat importComponent('${ path }')`)
  } finally {
    document.head.removeChild(base)
  }
}

export function importAllComponents(element: ParentNode, rel: string, basepath?: URL) {
  for (let link of element.querySelectorAll<HTMLLinkElement>(`link[rel=${ rel }]`))
    importComponent(new URL(link.href, basepath).href, link.getAttribute('as')!, link)
}

function preloadStylesheets(element: ParentNode, basepath: URL) {
  for (const link of element.querySelectorAll<HTMLLinkElement>('link[rel=stylesheet]')) {
    const preload = <HTMLLinkElement> link.cloneNode()
    preload.rel = 'preload'
    preload.as = 'style'
    preload.href = new URL(link.href, basepath).href
    document.head.append(preload)
  }
}