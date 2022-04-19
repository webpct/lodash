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
  const getPathValue = (entryPaths) => entryPaths.reduce((acc, path, idx, arr) => {
    const matchedArrayIdx = path.match(/\[(.*?\d)\]/)

    if (matchedArrayIdx && acc[path[0]] && acc[path[0]][matchedArrayIdx[1]]) {
      return acc[path[0]][matchedArrayIdx[1]]
    }
    if (!matchedArrayIdx && acc[path]) {
      return acc[path]
    }
    arr.splice(1)
    return
  }, object || {})

  const parsePath = (entryPaths) => entryPaths.map((path) => {
    const exploredPath = typeof path === 'string' ? path.split('.') : [String(path)]
    return getPathValue(exploredPath)
  })

  const isPseudoArray = !(paths[0] && paths[0].sort) && typeof paths[0] === 'object'
  const isArray = Array.isArray(paths[0])

  if (isPseudoArray) {
    return parsePath([...paths[0]])
  }

  if (isArray) {
    return parsePath(paths[0])
  }

  return parsePath(paths)
}

export default at
