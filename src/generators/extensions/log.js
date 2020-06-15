import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { log } from '../operators/log';
ExtendedAsyncGenerator.prototype.log = function (...args) {
    log(this, ...args);
};
