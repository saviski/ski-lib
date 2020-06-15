import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { from } from './from';
import { call } from '../operators/call';
ExtendedAsyncGenerator.prototype.call = function (key, ...args) {
    return call(this, key, from, ...args);
};
