import AsyncGeneratorEmitter from './async-generator-emitter';
import '../../core/ski-data';
import '../index';
export default class EventGenerator extends AsyncGeneratorEmitter {
    constructor(element, type, options = {}) {
        super();
        this.element = element;
        this.type = type;
        this.options = options;
        this.handler = (event) => {
            this.options.preventDefault && event.preventDefault();
            this.options.stopPropagation && event.stopPropagation();
            if (!this.options.matches || event.target instanceof Element && event.target.matches(this.options.matches))
                super.emit(event instanceof CustomEvent ? event.detail : event);
        };
        element.addEventListener(type, this.handler);
    }
    matches(query) {
        this.options.matches = query;
        return this;
    }
    preventDefault(prevent = true) {
        this.options.preventDefault = prevent;
        return this;
    }
    stopPropagation(stop = true) {
        this.options.stopPropagation = stop;
        return this;
    }
    get target() {
        return this.map(event => event.target);
    }
    get detail() {
        return this.map(event => event['detail']);
    }
    get skidata() {
        return this.target.filter(element => element instanceof Node).map(element => element.skidata).get;
    }
    emit(detail) {
        this.element.dispatchEvent(new CustomEvent(this.type, { detail, bubbles: true }));
    }
    // decorator(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    //   return null;
    // }
    remove() {
        this.element.removeEventListener(this.type, this.handler);
    }
}
const events$ = Symbol('events');
export function events(context) {
    return context[events$] || (context[events$] = new Proxy(context, {
        has: (_, property) => typeof property == 'string',
        get(target, property) {
            if (property != property.toString().toLowerCase())
                console.warn(`Consider using only lowercase letters for event ${property.toString()} name`);
            if (property in this)
                return this[property];
            if (typeof property == 'string') {
                return this[property] = new EventGenerator(target, property);
            }
        }
    }));
}
Object.defineProperty(Node.prototype, 'events', {
    get() {
        return events(this);
    }
});
Object.defineProperty(Node.prototype, 'preventDefault', {
    set(eventList) {
        eventList.split(/\s+/).forEach(event => this.events[event].preventDefault());
    },
    get() {
        return new Proxy(this.events, {
            set(t, p, v) {
                t[p].preventDefault(v || (v === undefined));
                return true;
            }
        });
    }
});
window.events = events(window);
