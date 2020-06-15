import { ExtendedAsyncGenerator } from '../extended-async-generator';
Object.defineProperties(ExtendedAsyncGenerator, {
    current: {
        get() {
            const set = () => this.current = this.next().then(next);
            const next = value => set() && value;
            Object.defineProperty(this, 'current', { value: null, writable: true });
            return set();
        }
    }
});
