const importAll = r => r.keys()
  .map(key => key.slice(2)
    .replace('.vue', '').split('/'))

const pages = importAll(require.context('../views', true, /\.vue$/))

const generateRoute = path => {
  // Note: remove first element if route starts with index
  if (path[0].toLowerCase().startsWith('index') && path.length > 1) {
    path.shift()
  }
  // Note: handle root routes
  if (path.length === 1) {
    const shortcut = path[0].toLowerCase()
    return shortcut.startsWith('index')
      ? ''
      : shortcut
  }
  // Note: handle other routes
  const lastElement = path[path.length - 1]
  // Note: remove last element in array if it is index
  if (lastElement.toLowerCase().startsWith('index')) {
    path.pop()
  }
  return path.map(p => p.toLowerCase()).join('/')
}

export default pages
  .map(async path => {
    const { default: component } = await import(`../views/${path.join('/')}`)
    const { name } = component
    const route = `/${generateRoute([...path])}`
    return {
      path: route,
      name,
      component
    }
  })
