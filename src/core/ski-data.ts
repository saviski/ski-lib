const dataStore = new WeakMap<Node, object>();

!('skidata' in Node.prototype) &&
Object.defineProperty(Node.prototype, 'skidata', {

  get(this: Node): object {
    let data = dataStore.get(this);
    if (!data) dataStore.set(this, data = {});
    return this.parentNode ? 
      Object.setPrototypeOf(data, this.parentNode.skidata) :
        this instanceof Attr && this.ownerElement ?
          Object.setPrototypeOf(data, this.ownerElement.skidata) :
            data;
  }

});


export interface TypedSkiData<T> {
  readonly skidata: T;
}

declare global {

  interface Node extends TypedSkiData<any> {
    
  }

  interface Attr {
    processed?: boolean;
  }

}