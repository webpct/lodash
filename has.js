/** Used to check objects for own properties. */
/**
 * Checks if `key` is a direct property of `object`.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @see hasIn, hasPath, hasPathIn
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * has(object, 'a')
 * // => true
 *
 * has(other, 'a')
 * // => false
 */
function has(object, key) {
  const checkPath = (entryPaths) => entryPaths.reduce((acc, path, idx, arr) => {
    if (arr.length - 1 === idx) {
      return acc.hasOwnProperty(path)
    }

    return object[path]
  }, object || {})

  if (Array.isArray(key)) {
    return checkPath(key)
  }

  return checkPath(key.split('.'))
}

export default has
