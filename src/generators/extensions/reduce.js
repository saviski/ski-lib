import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { from } from './from';
import { reduce } from '../operators/reduce';
ExtendedAsyncGenerator.prototype.reduce = function (next, index) {
    return from(reduce(this, next, index));
};
