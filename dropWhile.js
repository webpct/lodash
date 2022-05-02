/**
 * Creates a slice of `array` excluding elements dropped from the beginning.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': false }
 * ]
 *
 * dropWhile(users, ({ active }) => active)
 * // => objects for ['pebbles']
 */
function dropWhile(array, predicate) {
  if (typeof predicate === 'function') {
    return array.slice(array.findIndex((item, idx, array) => !predicate(item, idx, array)))
  }

  if (typeof predicate === 'string') {
    return array.slice(array.findIndex((item) => !(typeof item[predicate] === 'undefined')))
  }

  if (Array.isArray(predicate)) {
    const [key, value] = predicate
    return array.slice(array.findIndex((item) => !(item[key] === value)))
  }

  if (typeof predicate === 'object' && predicate !== null) {
    return array.slice(array.findIndex((item) => Object.entries(predicate).some(([key, value]) => !(item[key] === value))))
  }

  return []
}

export default dropWhile
