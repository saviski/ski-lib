import AsyncGeneratorEmitter from './async-generator-emitter';
import { ExtendedAsyncGenerator } from '../extended-async-generator';
import '../../core/ski-data';
import '../index';
export interface EventGeneratorOptions {
    preventDefault?: boolean;
    stopPropagation?: boolean;
    matches?: string;
}
declare type AddEventListener = Pick<HTMLElement, 'addEventListener' | 'removeEventListener' | 'dispatchEvent'>;
export default class EventGenerator<T extends Event> extends AsyncGeneratorEmitter<T> {
    private element;
    private type;
    private options;
    constructor(element: AddEventListener, type: string, options?: EventGeneratorOptions);
    handler: (event: Event) => void;
    matches(query: string): this;
    preventDefault(prevent?: boolean): this;
    stopPropagation(stop?: boolean): this;
    get target(): ExtendedAsyncGenerator<EventTarget | null>;
    get detail(): ExtendedAsyncGenerator<any>;
    get skidata(): AsyncGenerator<any>;
    emit(detail?: any): void;
    remove(): void;
}
declare type EventMap = {
    [K in keyof GlobalEventHandlersEventMap]: EventGenerator<GlobalEventHandlersEventMap[K]>;
} & {
    [K: string]: EventGenerator<any>;
};
declare global {
    interface Node {
        events: EventMap;
    }
    var events: EventMap;
}
export declare function events(context: AddEventListener | Document | Window): EventMap;
export {};
