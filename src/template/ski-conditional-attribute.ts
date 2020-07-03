import { Rule } from '../core/ski-rule';
import SkiAttributeEvaluation from '../core/ski-attribute-evaluation';

export default class SkiConditionalAttribute extends SkiAttributeEvaluation {

  static readonly evaluationSnapshot = false;

  constructor(root: Node, name = '?', rule = Rule.SUFFIX) {
    super(root, name, rule);
  }

  protected apply(element: Element, target: string, enable: any) {
    enable ? element.setAttribute(target, '') : element.removeAttribute(target)
  }
}