// import { hasAsyncGenerator } from '../generators/operators/has'
// import { map } from '../generators/operators/map'

// class Dependency {}

// class SkiDependencyEval {
//   private original = new Map<any, any>()
//   private valueMap = new Map<any, string>()
//   private function: Function

//   private static generatorValues = new Map<AsyncGenerator<any>, any>()
//   private static generatorPromises = new Map<AsyncGenerator<any>, Promise<any>>()

//   constructor(private expression: string, private context: any, private scope: any) {
//     try {
//       this.function = new Function(
//         '__arg0__',
//         `with (__arg0__) return (${this.expression || undefined})`
//       )
//     } catch (e) {
//       throw Error(`Creating function() {\n\t${expression})\n}\n${e}`)
//     }
//   }

//   async *run() {
//     do {
//       this.original.clear()
//       this.valueMap.clear()
//       try {
//         let result = this.function.call(this.context, new Proxy(this.scope, this))
//         hasAsyncGenerator(result)
//           ? yield* this.original.get(result) || result
//           : yield this.original.get(result) || result
//       } catch (e) {
//         if (!(e instanceof Dependency))
//           throw Error(`Evaluating expression (${this.expression})\n${e}`)
//       }
//       await this.deps()
//     } while (this.generators().length > 0)

//     this.original.clear()
//     this.valueMap.clear()
//   }

//   deps() {
//     return Promise.race(
//       this.generators().map(gen => SkiDependencyEval.generatorPromises.get(gen))
//     )
//   }

//   private generators() {
//     return Array.from(this.valueMap.keys()).filter(
//       data => hasAsyncGenerator(data) && SkiDependencyEval.generatorPromises.has(data)
//     )
//   }

//   get dependencies() {
//     return Array.from(this.valueMap.values())
//   }

//   get entries() {
//     return new Map([...this.valueMap.entries()].map(([key, value]) => [value, key]))
//   }

//   private proxy(data: any) {
//     let result = new Proxy(data, this)
//     this.original.set(result, data)
//     return result
//   }

//   private register(target: any, property: string, value: any) {
//     let chain = this.valueMap.get(target)
//     this.valueMap.set(value, chain ? `${chain}.${property}` : property)
//   }

//   get(target: any, property: PropertyKey, _receiver: any) {
//     if (property === Symbol.unscopables) return target[property]

//     if (!(property in target))
//       throw ReferenceError(`${String(property)} is not defined in: ${target}`)

//     let value = hasAsyncGenerator<any>(target)
//       ? this.map(target, property)
//       : target[property]

//     this.register(target, String(property), value)
//     if (hasAsyncGenerator(value)) value = this.generatorValue(value)

//     return value && typeof value === 'object' ? this.proxy(value) : value
//   }

//   map(generator: AsyncGenerator<any>, property: PropertyKey) {
//     const uniqueName = '__' + String(property) + '__'
//     return (
//       generator[uniqueName] || (generator[uniqueName] = map(generator, v => v[property]))
//     )
//   }

//   generatorValue(generator: AsyncGenerator<any>) {
//     if (SkiDependencyEval.generatorValues.has(generator))
//       return SkiDependencyEval.generatorValues.get(generator)
//     else {
//       this.watchStream(generator)
//       throw new Dependency()
//     }
//   }

//   async watchStream(generator: AsyncGenerator<any>) {
//     const name = this.valueMap.get(generator)
//     let stream = generator[Symbol.asyncIterator]()
//     if (!SkiDependencyEval.generatorPromises.has(generator)) {
//       try {
//         do {
//           let next = stream.next()
//           SkiDependencyEval.generatorPromises.set(generator, next)
//           var data = await next
//           !data.done && SkiDependencyEval.generatorValues.set(generator, data.value)
//         } while (!data.done)
//       } finally {
//         SkiDependencyEval.generatorPromises.delete(generator)
//       }
//     }
//   }
// }
