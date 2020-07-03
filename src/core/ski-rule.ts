export enum Rule {
  EQUALS,
  PREFIX,
  SUFFIX,
  SEPARATOR,
  CONTAINS,
  SURROUNDING,
}

const ruleTest = {
  [Rule.EQUALS]: (str: string, type: string) => `${type} = "${str}"`,
  [Rule.PREFIX]: (str: string, type: string) => `starts-with(${type},"${str}")`,
  [Rule.SUFFIX]: (str: string, type: string) => `substring(${type},string-length(${type}) - ${str.length - 1}) = '${str}'`,
  [Rule.SEPARATOR]: (str: string, type: string) => `contains(${type}, '${str}')`,
  [Rule.CONTAINS]: (str: string, type: string) => `contains(${type}, '${str}')`,
  [Rule.SURROUNDING]: (str: string, type: string) => ruleTest[Rule.PREFIX](str, type) + ' and ' + ruleTest[Rule.SUFFIX](str, type),
}

const regexp = {
  [Rule.EQUALS]: (str: string) => new RegExp('(?=^' + escapeRegExp(str) + '$)'),
  [Rule.PREFIX]: (str: string) => new RegExp('^' + escapeRegExp(str)),
  [Rule.SUFFIX]: (str: string) => new RegExp(escapeRegExp(str) + '$'),
  [Rule.SEPARATOR]: (str: string) => new RegExp(`(?=.+${escapeRegExp(str)}.+)`),
  [Rule.CONTAINS]: (str: string) => new RegExp(`(?=.*${escapeRegExp(str)}.*)`),
  [Rule.SURROUNDING]: (str: string) => new RegExp(`(?=^${escapeRegExp(str)}.+${escapeRegExp(str)}$)`),
}

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const xpathTest = (name: string, rule: Rule, type: string) => ruleTest[rule](name, type)

export const xpathAttr = (name: string, rule: Rule) => `.//@*[${xpathTest(name, rule, 'name()')}]`

export const xpathContent = (name: string, rule: Rule) => `.//text()[${xpathTest(name, rule, 'normalize-space(.)')}]`

export const matcher = (name: string, rule: Rule): RegExp => regexp[rule](name)
