/**
 * Invokes the method at `path` of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} [args] The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] }
 *
 * invoke(object, 'a[0].b.c.slice', [1, 3])
 * // => [2, 3]
 */
function invoke(object, path, ...args) {
  const getPathValue = (entryPaths) => entryPaths.reduce((acc, path, idx, arr) => {
    const isArrayPath = path.match(/\[(.*?\d)\]/)
    const [_, matchedArrayIdx] = isArrayPath || []
    const [currentPathKey] = path

    if (!acc) {
      arr.splice(1)
      return
    }

    if (isArrayPath && acc[currentPathKey] && acc[currentPathKey][matchedArrayIdx]) {
      return acc[currentPathKey][matchedArrayIdx]
    }

    if (!isArrayPath && acc[path] && typeof acc[path] !== 'function') {
      return acc[path]
    }

    if (!isArrayPath && acc[path] && typeof acc[path] === 'function') {
      return {
        iterableObj: acc,
        func: acc[path]
      }
    }

  }, object || {})

  if (Array.isArray(path)) {
    const { iterableObj, func } = getPathValue(path) || {}
    return func ? func.apply(iterableObj, args) : undefined
  }

  const { iterableObj, func } = getPathValue(path.split('.')) || {}
  return func ? func.apply(iterableObj, args) : undefined
}

export default invoke
