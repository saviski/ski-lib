import 'es-module-shims';

declare global {
  const importShim: <T = any>(path: string) => Promise<T>;
}

const IMPORT_REGEXP = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:"(?:.*?)")|(?:'(?:.*?)'))[\s]*?(?:;|$|)/g;

const addOriginToImports = (content: string, basepath: string | URL | undefined) =>
  content.replace(IMPORT_REGEXP, substring => {
    let [ _import, _from, _end ] = substring.split(/'|"/);
    let origin_from = new URL(_from, basepath);
    return `${_import}'${origin_from}'${_end}`;
  });

export async function importModuleContent(content: string, basepath?: URL) {
  content = addOriginToImports(content, basepath);
  let blob = new Blob([content], { type: 'text/javascript' });
  let dynamic_url = URL.createObjectURL(blob) + '#';
  try {
    return await importShim(dynamic_url);
  } finally {
    URL.revokeObjectURL(dynamic_url);
  }
}