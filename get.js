/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @see has, hasIn, set, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
function get(object, path, defaultValue) {
  let parsedPath = []

  if (typeof path === 'string') {
    parsedPath = path.split('.')
  }

  if (Array.isArray(path)) {
    parsedPath = path.reduce((acc, item, idx, array) => {
      if (array.length - 1 !== idx && Number.isInteger(+array[idx + 1])) {
        return [...acc, `${item}[${array[idx + 1]}]`]
      }

      if (Number.isInteger(+item)) {
        return acc
      }

      return [...acc, item]
    }, [])
  }

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

  const value = getPathValue(parsedPath)

  return typeof value === 'undefined' ? defaultValue : value
}

export default get
