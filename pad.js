/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * pad('abc', 8)
 * // => '  abc   '
 *
 * pad('abc', 8, '_-')
 * // => '_-abc_-_'
 *
 * pad('abc', 2)
 * // => 'abc'
 */
function pad(string, length, chars=' ') {
  if (string.length >= length) {
    return string
  }

  const padLength = length - string.length
  const repeatChars = chars.repeat(padLength)

  const startPadLength = ~~(padLength / 2)
  const endPadLength = padLength - startPadLength

  const startPad = repeatChars.slice(0, startPadLength)
  const endPad = repeatChars.slice(0, endPadLength)

  return `${startPad}${string}${endPad}`
}

export default pad
