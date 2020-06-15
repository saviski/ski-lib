import SkiPropertyObserver from './ski-property-observer';
export default class SkiCondiction extends SkiPropertyObserver {
    constructor(root, attr, fallback) {
        super(root, attr);
        this.fallback = fallback;
    }
    prepare(element) {
        var _a;
        const tag = element.tagName.toLowerCase();
        const elseElement = this.fallback && ((_a = element.nextElementSibling) === null || _a === void 0 ? void 0 : _a.matches(`[${this.fallback}]`)) && element.nextElementSibling;
        return {
            placeholder: elseElement || document.createComment(`<${tag}>hidden</${tag}>`)
        };
    }
    set(element, value, { placeholder }) {
        if (this.checkCondiction(value, element))
            placeholder.parentNode && placeholder.replaceWith(element);
        else
            element.parentNode && element.replaceWith(placeholder);
    }
}
