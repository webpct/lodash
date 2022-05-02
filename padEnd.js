/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * padEnd('abc', 6)
 * // => 'abc   '
 *
 * padEnd('abc', 6, '_-')
 * // => 'abc_-_'
 *
 * padEnd('abc', 2)
 * // => 'abc'
 */
function padEnd(string, length, chars=' ') {
  if (string.length >= length) {
    return string
  }

  const padLength = length - string.length
  const repeatChars = chars
    .repeat(padLength)
    .slice(0, padLength)

  return `${string}${repeatChars}`
}

export default padEnd
