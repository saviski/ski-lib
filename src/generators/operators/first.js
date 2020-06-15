export function first(source) {
    return source.next().then(({ value }) => value);
}
