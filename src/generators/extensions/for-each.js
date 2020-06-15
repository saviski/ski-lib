import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { forEach } from '../operators/for-each';
ExtendedAsyncGenerator.prototype.forEach = function (next, index) {
    forEach(this, next, index);
};
