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
