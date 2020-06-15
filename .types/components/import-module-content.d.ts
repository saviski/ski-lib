import 'es-module-shims';
declare global {
    const importShim: <T = any>(path: string) => Promise<T>;
}
export declare function importModuleContent(content: string, basepath?: URL): Promise<any>;
