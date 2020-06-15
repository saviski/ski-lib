import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { find } from '../operators/find';
ExtendedAsyncGenerator.prototype.find = function (predicate, index) {
    return find(this, predicate, index);
};
