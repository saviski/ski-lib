export default class SkiDependencyEval {
    private expression;
    private context;
    private scope;
    private original;
    private valueMap;
    private function;
    private static generatorValues;
    private static generatorPromises;
    constructor(expression: string, context: any, scope: any);
    run(): AsyncGenerator<any, void, any>;
    deps(): Promise<any>;
    private generators;
    get dependencies(): string[];
    get entries(): Map<string, any>;
    private proxy;
    private register;
    get(target: any, property: PropertyKey, _receiver: any): any;
    map(generator: AsyncGenerator<any>, property: PropertyKey): any;
    generatorValue(generator: AsyncGenerator<any>): any;
    watchStream(generator: AsyncGenerator<any>): Promise<void>;
}
