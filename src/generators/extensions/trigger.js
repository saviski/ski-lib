import { ExtendedAsyncGenerator } from '../extended-async-generator';
import { from } from './from';
import { trigger } from '../operators/trigger';
ExtendedAsyncGenerator.prototype.trigger = function (factory) {
    return from(trigger(this, factory));
};
