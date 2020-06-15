import { __awaiter } from "tslib";
import { importModuleContent } from './import-module-content';
import SkiProperty from '../core/ski-property';
import SkiAll from '../ski-all';
class SkiComponent extends HTMLElement {
    constructor() {
        super();
        this.basepath = new URL(location.origin);
        this.content = document.createDocumentFragment();
        this.content.append(...this.childNodes);
        const name = this.getAttribute('name');
        const extendsComponent = this.getAttribute('extends');
        this.createComponent(name, extendsComponent);
    }
    createComponent(name, extendsComponent) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseComponent = extendsComponent ? (yield customElements.whenDefined(extendsComponent),
                yield customElements.get(extendsComponent)) :
                HTMLElement;
            const modules = yield Array.from(this.content.querySelectorAll('script[type=module]'))
                .map(module => module.src ?
                import(new URL(module.src, this.basepath).href) :
                importModuleContent(module.innerHTML, this.basepath))
                .reduce((modules, module) => __awaiter(this, void 0, void 0, function* () { return Object.assign(yield modules, yield module); }), Promise.resolve({}));
            createComponent(name, this.content, baseComponent, modules.default);
        });
    }
}
export function initSkiComponent(name = 'ski-component') {
    window.customElements.get(name) || customElements.define(name, SkiComponent);
}
function createComponent(name, content, baseComponent, objectClass) {
    var _a, _b;
    var _c;
    const attributes = Object.keys((_b = (_a = objectClass) === null || _a === void 0 ? void 0 : _a.properties, (_b !== null && _b !== void 0 ? _b : {})));
    const component = (_c = class extends baseComponent {
            constructor() {
                super();
                const shadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.append(content.cloneNode(true));
                Object.assign(shadowRoot.skidata, this.properties = this.buildProperties());
            }
            buildProperties() {
                let object = objectClass ? new objectClass(this) : {};
                let properties = Object.fromEntries(attributes.map(name => [name, SkiProperty.wrap(this, name)]));
                Object.defineProperties(object, properties);
                return properties;
            }
            connectedCallback() {
                this.ski = new SkiAll(this.shadowRoot, this.skidata);
            }
            disconnectedCallback() {
                var _a;
                (_a = this.ski) === null || _a === void 0 ? void 0 : _a.disconnect();
            }
            attributeChangedCallback(name, _oldValue, newValue) {
                this.properties[name].set(newValue);
            }
        },
        _c.observedAttributes = attributes,
        _c);
    customElements.define(name, component);
}
