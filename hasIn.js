/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @see has, hasPath, hasPathIn
 * @example
 *
 * const object = create({ 'a': create({ 'b': 2 }) })
 *
 * hasIn(object, 'a')
 * // => true
 *
 * hasIn(object, 'b')
 * // => false
 */
function hasIn(object, key) {
  const checkPath = (entryPaths) => entryPaths.reduce((acc, path, idx, arr) => {
    if (arr.length - 1 === idx) {
      return acc.hasOwnProperty(path)
    }

    return Object.getPrototypeOf(object[path])
  }, Object.getPrototypeOf(object) || {})


  if (Array.isArray(key)) {
    return checkPath(key)
  }

  return checkPath(key.split('.'))
}

export default hasIn
