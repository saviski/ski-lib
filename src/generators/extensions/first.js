import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { first } from '../operators/first';
Object.defineProperties(ExtendedAsyncGenerator, {
    first: {
        get() {
            return first(this);
        }
    }
});
