import { map } from './map';
import { clone } from './clone';
export function get(source, property, wrap = clone) {
    return wrap(map(source, data => data[property]));
}
