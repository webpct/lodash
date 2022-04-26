
/**
 * Converts the first character of `string` to lower case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * lowerFirst('Fred')
 * // => 'fred'
 *
 * lowerFirst('FRED')
 * // => 'fRED'
 */
const lowerFirst = (string) => string.charAt(0).toLowerCase() + string.slice(1)

export default lowerFirst
