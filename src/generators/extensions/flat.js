import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { from } from './from';
import { flat } from '../operators/flat';
Object.defineProperties(ExtendedAsyncGenerator, {
    flat: {
        get() {
            return from(flat(this));
        }
    }
});
