import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { get } from '../operators/get';
import { from } from './from';
ExtendedAsyncGenerator.prototype.get = function (key) {
    return get(this, key, from);
};
