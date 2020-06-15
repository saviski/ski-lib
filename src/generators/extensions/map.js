import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { map } from '../operators/map';
import { from } from './from';
ExtendedAsyncGenerator.prototype.map = function (next, index) {
    return from(map(this, next, index));
};
