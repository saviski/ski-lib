import SkiCondiction from '../core/ski-condition';

export default class SkiIf extends SkiCondiction {

  constructor(root: Node, attr = 'if', fallback = 'else') {
    super(root, attr, fallback);
  }

  protected checkCondiction(value: any): boolean {
    return value;
  }

}