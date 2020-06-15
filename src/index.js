import './core/ski-data';
import './generators/index';
import './generators/events/dom-events';
import SkiAll from './ski-all';
import { initSkiComponent } from './components/ski-component';
export function skiInit(root, data = {}) {
    initSkiComponent('ski-component');
    return new SkiAll(root, data).init();
}
export { Rule } from './core/ski-rule';
export * from './template/ski-association';
export * from './template/ski-class';
export * from './template/ski-val';
export * from './template/ski-if';
export * from './template/ski-let';
export * from './template/ski-unless';
export * from './template/ski-repeat';
export * from './template/ski-switch';
export * from './template/ski-event-trigger';
export * from './template/ski-template-string';
export * from './template/ski-name';
export * from './template/ski-inline-expression';
export { initSkiComponent } from './components/ski-component';
