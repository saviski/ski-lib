import SkiCondiction from '../core/ski-condition';

export default class SkiUnless extends SkiCondiction {

  constructor(root: Node, attr = 'unless', fallback = 'else') {
    super(root, attr, fallback);
  }

  protected checkCondiction(value: any): boolean {
    return value === undefined ? false : !value;
  }

}