export var Rule;
(function (Rule) {
    Rule[Rule["EQUALS"] = 0] = "EQUALS";
    Rule[Rule["PREFIX"] = 1] = "PREFIX";
    Rule[Rule["SUFFIX"] = 2] = "SUFFIX";
    Rule[Rule["SEPARATOR"] = 3] = "SEPARATOR";
    Rule[Rule["CONTAINS"] = 4] = "CONTAINS";
    Rule[Rule["SURROUNDING"] = 5] = "SURROUNDING";
})(Rule || (Rule = {}));
const ruleTest = {
    [Rule.EQUALS]: (str, type) => `${type} = "${str}"`,
    [Rule.PREFIX]: (str, type) => `starts-with(${type},"${str}")`,
    [Rule.SUFFIX]: (str, type) => `substring(${type},string-length(${type}) - ${str.length - 1}) = '${str}'`,
    [Rule.SEPARATOR]: (str, type) => `contains(${type}, '${str}')`,
    [Rule.CONTAINS]: (str, type) => `contains(${type}, '${str}')`,
    [Rule.SURROUNDING]: (str, type) => ruleTest[Rule.PREFIX](str, type) + ' and ' + ruleTest[Rule.SUFFIX](str, type)
};
const regexp = {
    [Rule.EQUALS]: (str) => new RegExp('(?=^' + escapeRegExp(str) + '$)'),
    [Rule.PREFIX]: (str) => new RegExp('^' + escapeRegExp(str)),
    [Rule.SUFFIX]: (str) => new RegExp(escapeRegExp(str) + '$'),
    [Rule.SEPARATOR]: (str) => new RegExp(`(?=.+${escapeRegExp(str)}.+)`),
    [Rule.CONTAINS]: (str) => new RegExp(`(?=.*${escapeRegExp(str)}.*)`),
    [Rule.SURROUNDING]: (str) => new RegExp(`(?=^${escapeRegExp(str)}.+${escapeRegExp(str)}$)`),
};
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const xpathTest = (name, rule, type) => ruleTest[rule](name, type);
export const xpathAttr = (name, rule) => `.//@*[${xpathTest(name, rule, 'name()')}]`;
export const xpathContent = (name, rule) => `.//text()[${xpathTest(name, rule, 'normalize-space(.)')}]`;
export const matcher = (name, rule) => regexp[rule](name);
