import { Rule } from '../core/ski-rule';
import SkiAttributeEvaluation from '../core/ski-attribute-evaluation';
/**
 * Toggle element classes defined as attribute with live updates
 * @param attr An attribute with name starting with . (dot)
 * The attribute name can be chained like .name1.name2.name3
 *
 * @explample condictional element class
 * ```html
 * <span .name1.name2="expressionA" .name3="expressionB">text</span>
 * ```
 * will be transformed into:
 * ```html
 * <span class="name1 name2">text</span>
 * ```
 * if expressionA evaluates to `true` and expressionB evaluates to `false`
 *
 * if expression is missing, the condiction is considered to be truty and the class is added to the element class list
 * @explample conditionless element class
 * ```html
 * <span .name1 .name2>text</span>
 * ```
 * will be transformed into:
 * ```html
 * <span class="name1 name2">text</span>
 * ```
 */
export default class SkiClass extends SkiAttributeEvaluation {
    static readonly evaluationSnapshot = false;
    constructor(root: Node, name?: string, rule?: Rule);
    protected apply(element: Element, target: string, enable: any): void;
    private toggleClass;
}
