import SkiCondiction from '../core/ski-condiction';
export default class SkiUnless extends SkiCondiction {
    constructor(root: Node, attr?: string, fallback?: string);
    protected checkCondiction(value: any): boolean;
}
