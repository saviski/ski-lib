import watch from '../mix/with/watch'

export const onchange: ClassDecorator = <T extends Function>(target: T): T =>
  watch()(target)
