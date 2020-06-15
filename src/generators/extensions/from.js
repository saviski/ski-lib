import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { clone } from '../operators/clone';
export function from(source) {
    return Object.setPrototypeOf(clone(source), ExtendedAsyncGenerator.prototype);
}
