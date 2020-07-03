import TokenList from 'tokenlist/src/tokenlist'

interface Serializer<T> {
  fromString(valie: string): T
  toString(value: T): string
}

export function tokenList<T>(list?: string[], serialize?: Serializer<T>): DOMTokenList
export function tokenList<T>(list?: RegExp, serialize?: Serializer<T>): DOMTokenList
export function tokenList<T>(list?: (value: T) => boolean, serialize?: Serializer<T>): DOMTokenList
export function tokenList<T>(list?: any, serialize?: Serializer<T>): DOMTokenList {
  let tokenlist = ''
  return TokenList(
    () => tokenlist,
    value => (tokenlist = value),
    token => (list instanceof RegExp ? list.test(token) : typeof list == 'function' ? list(token) : list?.includes(token) ?? true),
    serialize?.fromString,
    serialize?.toString
  )
}
