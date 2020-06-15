import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { filter, filterValue } from '../operators/filter';
import { from } from './from';
ExtendedAsyncGenerator.prototype.filter = function (test, index) {
    return from(typeof test == 'function' ? filter(this, test, index) : filterValue(this, test));
};
