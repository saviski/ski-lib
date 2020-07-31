import observeMixin from '../mix/with/observables.js'

export const observe: ClassDecorator = <T extends Function>(target: T): T =>
  observeMixin()(target)
