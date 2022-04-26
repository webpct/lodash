/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @see difference, unionBy, unionWith, without, xor, xorBy
 * @example
 *
 * union([2, 3], [1, 2])
 * // => [2, 3, 1]
 */
function union(...arrays) {
  const set = new Set()
  const result = []

  arrays.forEach((array) => {
    array.forEach((item) => {
      set.add(item)
    })
  })
  for (const value of set) {
    result.push(value)
  }

  return result
}

export default union
