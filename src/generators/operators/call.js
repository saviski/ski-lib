import { map } from './map';
import { clone } from './clone';
export function call(source, method, wrap = clone, ...args) {
    return wrap(map(source, data => data[method](...args)));
}
