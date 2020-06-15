import './core/ski-data';
import './generators/index';
import './generators/events/dom-events';
export default class SkiAll {
    private all;
    constructor(root: Node, data?: Readonly<object>);
    init(): void;
    disconnect(): void;
}
