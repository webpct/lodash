/**
 * Computes `number` rounded up to `precision`. (Round up: the smallest integer greater than or equal to a given number.)
 *
 * @since 3.10.0
 * @category Math
 * @param {number} number The number to round up.
 * @param {number} [precision=0] The precision to round up to.
 * @returns {number} Returns the rounded up number.
 * @example
 *
 * ceil(4.006)
 * // => 5
 *
 * ceil(6.004, 2)
 * // => 6.01
 *
 * ceil(6040, -2)
 * // => 6100
 */
function createRound(n, round) {
  return round?  Math.ceil((n)*Math.pow(10, round))/Math.pow(10, round) : Math.ceil(n)
}
const ceil = createRound(4.006)

export default ceil
