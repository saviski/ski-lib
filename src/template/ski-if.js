import SkiCondiction from '../core/ski-condiction';
export default class SkiIf extends SkiCondiction {
    constructor(root, attr = 'if', fallback = 'else') {
        super(root, attr, fallback);
    }
    checkCondiction(value) {
        return value;
    }
}
