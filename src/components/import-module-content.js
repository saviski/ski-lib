import { __awaiter } from "tslib";
import 'es-module-shims';
const IMPORT_REGEXP = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:"(?:.*?)")|(?:'(?:.*?)'))[\s]*?(?:;|$|)/g;
const addOriginToImports = (content, basepath) => content.replace(IMPORT_REGEXP, substring => {
    let [_import, _from, _end] = substring.split(/'|"/);
    let origin_from = new URL(_from, basepath);
    return `${_import}'${origin_from}'${_end}`;
});
export function importModuleContent(content, basepath) {
    return __awaiter(this, void 0, void 0, function* () {
        content = addOriginToImports(content, basepath);
        let blob = new Blob([content], { type: 'text/javascript' });
        let dynamic_url = URL.createObjectURL(blob) + '#';
        try {
            return yield importShim(dynamic_url);
        }
        finally {
            URL.revokeObjectURL(dynamic_url);
        }
    });
}
