import SkiCondiction from '../core/ski-condiction';
export default class SkiUnless extends SkiCondiction {
    constructor(root, attr = 'unless', fallback = 'else') {
        super(root, attr, fallback);
    }
    checkCondiction(value) {
        return value === undefined ? false : !value;
    }
}
