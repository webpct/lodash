/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * const object = { 'a': 1 }
 * const other = { 'a': 1 }
 *
 * isEqual(object, other)
 * // => true
 *
 * object === other
 * // => false
 */
function isEqual(value, other) {
  if (typeof value !== 'object' && typeof other !== 'object' && value !== other) {
    return false
  }

  const props1 = Object.getOwnPropertyNames(value)
  const props2 = Object.getOwnPropertyNames(other)


  if (props1.length !== props2.length) {
    return false
  }

  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i]
    const bothAreObjects = typeof (value[prop]) === 'object' && typeof (other[prop]) === 'object'

    if ((!bothAreObjects && (value[prop] !== other[prop]))
    || (bothAreObjects && !isEqual(value[prop], other[prop]))) {
      return false
    }
  }

  return true
}

export default isEqual
