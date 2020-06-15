import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { start } from '../operators/start';
import { from } from './from';
ExtendedAsyncGenerator.prototype.start = function (value) {
    return from(start(this, value));
};
