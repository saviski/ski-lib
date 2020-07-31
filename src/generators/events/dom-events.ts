import { lazyGetter } from './../../extras/lazy-getter'
import AsyncGeneratorEmitter from './async-generator-emitter'
import { ExtendedAsyncGenerator } from '../extended-async-generator'
import '../../core/ski-data'
import '../extensions/'

export interface EventGeneratorOptions {
  preventDefault?: boolean
  stopPropagation?: boolean
  matches?: string
}

type AddEventListener = Pick<
  HTMLElement,
  'addEventListener' | 'removeEventListener' | 'dispatchEvent'
>

export default class EventGenerator<
  T extends Event = CustomEvent
> extends AsyncGeneratorEmitter<T extends CustomEvent<infer U> ? U : T> {
  constructor(
    private element: AddEventListener,
    private type: string,
    private options: EventGeneratorOptions = {}
  ) {
    super()
    element.addEventListener(type, this.handler)
  }

  handler = (event: Event) => {
    this.options.preventDefault && event.preventDefault()
    this.options.stopPropagation && event.stopPropagation()
    if (
      !this.options.matches ||
      (event.target instanceof Element && event.target.matches(this.options.matches))
    )
      super.emit(event instanceof CustomEvent ? (<CustomEvent>event).detail : event)
  }

  matches(query: string) {
    this.options.matches = query
    return this
  }

  preventDefault(prevent = true) {
    this.options.preventDefault = prevent
    return this
  }

  stopPropagation(stop = true) {
    this.options.stopPropagation = stop
    return this
  }

  get target(): ExtendedAsyncGenerator<EventTarget | null> {
    return this.map<EventTarget | null>(event => event.target)
  }

  get detail(): ExtendedAsyncGenerator<T extends CustomEvent<infer U> ? U : unknown> {
    return this.map(event => event['detail'])
  }

  get skidata(): AsyncGenerator<any> {
    return <any>(
      this.target
        .filter<Node>(element => element instanceof Node)
        .map(element => element.skidata).get
    )
  }

  emit(value: T extends CustomEvent<infer U> ? U : T) {
    this.element.dispatchEvent(
      value instanceof Event
        ? new (<typeof Event>value.constructor)(this.type, value)
        : new CustomEvent<any>(this.type, { detail: value, bubbles: true })
    )
  }

  // decorator(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  //   return null;
  // }

  remove() {
    this.element.removeEventListener(this.type, this.handler)
  }
}

export type EventMap = {
  [K in keyof GlobalEventHandlersEventMap]: EventGenerator<GlobalEventHandlersEventMap[K]>
} & {
  [K: string]: EventGenerator<CustomEvent>
}

declare global {
  interface Node {
    events: EventMap
  }

  var events: EventMap
}

const valid = property => {
  if (property != property.toString().toLowerCase())
    throw Error(`Use only lowercase letters for event: ${property.toString()} name`)
  return true
}

const events = (context: AddEventListener | Document | Window): EventMap =>
  lazyGetter(
    property => valid(property) && new EventGenerator(context, property),
    {}
  ) as EventMap

Object.defineProperty(Node.prototype, 'events', {
  get() {
    Object.defineProperty(this, 'events', { value: events(this) })
    return this.events
  },
})

Object.defineProperty(Node.prototype, 'preventDefault', {
  set(eventList: string) {
    eventList.split(/\s+/).forEach(event => this.events[event].preventDefault())
  },

  get() {
    return new Proxy(this.events, {
      set(t, p, v) {
        t[p].preventDefault(v || v === undefined)
        return true
      },
    })
  },
})

window.events = events(window)
