/**
 * Creates an array of unique values that is the
 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the given arrays. The order of result values is determined by the order
 * they occur in the arrays.
 *
 * @since 2.4.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of filtered values.
 * @see difference, union, unionBy, unionWith, without, xorBy, xorWith
 * @example
 *
 * xor([2, 1], [2, 3])
 * // => [1, 3]
 */
function xor(...arrays) {
  const result = []
  const collection = new Map()

  arrays.forEach((array) => {
    array.forEach((item) => {
      if (collection.has(item)) {
        const value = collection.get(item)
        collection.set(item, value + 1)
      } else {
        collection.set(item, 1)
      }
    })
  })

  for (const [key, value] of collection) {
    if (value === 1) {
      result.push(key)
    }
  }

  return result
}

export default xor
