const dataStore = window['dataStore'] = new WeakMap();
!('skidata' in Node.prototype) &&
    Object.defineProperty(Node.prototype, 'skidata', {
        get() {
            let data = dataStore.get(this);
            if (!data)
                dataStore.set(this, data = {});
            return this.parentNode ?
                Object.setPrototypeOf(data, this.parentNode.skidata) :
                this instanceof Attr && this.ownerElement ?
                    Object.setPrototypeOf(data, this.ownerElement.skidata) :
                    data;
        }
    });
