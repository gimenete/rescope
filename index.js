const rescopeObject = (obj, modules) => {
  return new Proxy(obj, {
    get(target, propKey) {
      const func = target[propKey]
      const code = `
        const { ${Object.keys(modules).join(',')} } = modules;
        return (function ${func.toString()})(...args)
      `
      const inner = new Function('modules', '...args', code)
      return inner.bind(target, modules)
    }
  })
}

module.exports = { rescopeObject }
