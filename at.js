/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @since 1.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Array} Returns the picked values.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 *
 * at(object, ['a[0].b.c', 'a[1]'])
 * // => [3, 4]
 */
const at = (object, ...paths) => {
  const [nestedArray] = paths
  const getPathValue = (entryPaths) => entryPaths.reduce((acc, path, idx, arr) => {
    const isArrayPath = path.match(/\[(.*?\d)\]/)
    const [_, matchedArrayIdx] = isArrayPath || []
    const [currentPathKey] = path
    if (!acc) {
      arr.splice(1)
      return
    }

    if (isArrayPath && acc[currentPathKey] && typeof acc[currentPathKey][matchedArrayIdx] !== 'undefined') {
      return acc[currentPathKey][matchedArrayIdx]
    }

    if (!isArrayPath && typeof acc[path] !== 'undefined') {
      return acc[path]
    }
  }, object || {})

  const parsePath = (entryPaths) => entryPaths.map((path) => {
    const exploredPath = typeof path === 'string' ? path.split('.') : [String(path)]
    return getPathValue(exploredPath)
  })

  const isPseudoArray = !(nestedArray && nestedArray.sort) && typeof nestedArray === 'object'
  const isArray = Array.isArray(nestedArray)

  if (isPseudoArray) {
    return parsePath([...nestedArray])
  }

  if (isArray) {
    return parsePath(nestedArray)
  }

  return parsePath(paths)
}

export default at
