import SkiPropertyObserver from '../core/ski-property-observer';
export default class SkiSwitch extends SkiPropertyObserver {
    constructor(root, attr = 'switch', condiction = 'case', fallback = 'default') {
        super(root, attr);
        this.condiction = condiction;
        this.fallback = fallback;
    }
    prepare(element) {
        return {
            contents: Array.from(element.children).map(child => element.removeChild(child))
        };
    }
    match(value, contents) {
        return contents.find(element => element.getAttribute(this.condiction) == value) ||
            contents.find(element => element.hasAttribute(this.fallback)) ||
            document.createComment("unmatched condiction");
    }
    set(element, value, { contents }) {
        var _a, _b;
        let match = this.match(value, contents);
        _b = (_a = element.firstElementChild) === null || _a === void 0 ? void 0 : _a.replaceWith(match), (_b !== null && _b !== void 0 ? _b : element.appendChild(match));
    }
}
