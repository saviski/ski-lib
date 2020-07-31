export const dashCase = (name: string) => name.replace(/([A-Z])/g, '-$1').toLowerCase()

export const camelCase = (name: string) =>
  name.replace(/-([a-z])/g, g => g[1].toUpperCase())
