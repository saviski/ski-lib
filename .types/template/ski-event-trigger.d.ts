import SkiAttributeObserver from '../core/ski-attribute-observer';
import '../core/ski-data';
import '../generators/extensions/trigger';
import '../generators/extensions/for-each';
export default class SkiEventTrigger extends SkiAttributeObserver {
    private separator;
    static readonly evaluationSnapshot = false;
    constructor(root: Node, separator?: string);
    update(attr: Attr, target: string): void;
    update_(attr: Attr, target: string): Promise<void>;
    detach(attr: Attr, target: string): void;
}
