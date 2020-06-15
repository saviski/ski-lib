import { clone } from './clone';
export function start(source, value) {
    const generator = clone(source);
    const next = generator.next;
    generator.next = function () {
        this.next = next;
        return Promise.resolve({ value, done: false });
    };
    return generator;
}
