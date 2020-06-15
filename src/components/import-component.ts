import './request-document';

const imports = new Set<string>();

export const importComponent = async (path: string, _overrideTagName?: string): Promise<any> => {
  let children: Element[] = [];
  try {
    const basepath = new URL(path, location.origin);
    if (!imports.has(basepath.href)) {
      const content = await (await fetch(basepath.href)).document();
      children = Array.from(content.children);
      document.body.append(content);
      imports.add(basepath.href);
    }
  } catch(e) {
    throw new Error(`${ e }\n\tat importComponent('${ path }')`);
  } finally {
    children.forEach(document.body.removeChild, document.body);
  }
}

addEventListener('load', () => {
  for (let link of document.querySelectorAll<HTMLLinkElement>('link[rel=component]'))
    importComponent(new URL(link.href).href, link.getAttribute('as')!);
})
