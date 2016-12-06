export const compose = a => b => c => a(b(c))
export const pipe = fns => x => fns.reduce((fn, v) => fn(v), x)
export const blackbird = compose(compose)(compose)
