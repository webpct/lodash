/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size = 1) {
  const shallowSource = [...array]
  const shallowInit = [...array]
  return typeof size === 'number' && size > 0 ? shallowInit.reduce((acc, item, idx, arr) => {
    const chunkSlice = shallowSource.splice(0, size)
    if (shallowSource.length <= size) {
      arr.splice(1)
      return [...acc, chunkSlice, shallowSource]
    }
    return [...acc, chunkSlice]
  }, []) : []
}

export default chunk
