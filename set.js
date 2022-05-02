/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @see has, hasIn, get, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * console.log(object.a[0].b.c)
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5)
 * console.log(object.x[0].y.z)
 * // => 5
 */
function set(object, path, value) {
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

  const setter = (nestedObject = {}, paths = [], value) => {
    if (paths.length === 1) {
      const [lastPath] = paths[0]
      return {
        ...nestedObject,
        [lastPath]: value
      };
    }

    let currentNode = {}
    let restArrayElements = []
    const [currentPath, ...restPaths] = paths
    const [currentPathKey] = currentPath
    const isArrayPath = currentPath.match(/\[(.*?\d)\]/)
    const [_, matchedArrayIdx] = isArrayPath || []

    if (matchedArrayIdx) {
      currentNode = nestedObject[currentPathKey] ? nestedObject[currentPathKey][matchedArrayIdx] : {}
      restArrayElements = nestedObject[currentPathKey] ? nestedObject[currentPathKey].filter((item, idx) => idx !== +matchedArrayIdx) : []
    } else {
      currentNode = nestedObject[currentPath]
    }

    const childNode = setter(currentNode, restPaths, value)
    const childElement = isArrayPath ? [childNode, ...restArrayElements] : childNode
    const childPath = isArrayPath ? currentPathKey : currentPath

    return { ...nestedObject, [childPath]: childElement };
  }

  for (const [setKey, setValue] of Object.entries(setter(object, parsedPath, value))) {
    object[setKey] = setValue
  }

  return object
}

export default set
