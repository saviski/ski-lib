import SkiTagObsever from '../core/ski-tag-observer';
export default class SkiVal extends SkiTagObsever {
    constructor(root: Node, name?: string);
    protected update(element: Element): Promise<void>;
    protected detachTree(node: Node): void;
    protected detach(text: Text): void;
}
