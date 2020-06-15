export declare enum Rule {
    EQUALS = 0,
    PREFIX = 1,
    SUFFIX = 2,
    SEPARATOR = 3,
    CONTAINS = 4,
    SURROUNDING = 5
}
export declare const xpathAttr: (name: string, rule: Rule) => string;
export declare const xpathContent: (name: string, rule: Rule) => string;
export declare const matcher: (name: string, rule: Rule) => RegExp;
