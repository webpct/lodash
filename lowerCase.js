/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @see camelCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * lowerCase('--Foo-Bar--')
 * // => 'foo bar'
 *
 * lowerCase('fooBar')
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__')
 * // => 'foo bar'
 */
const lowerCase = (string) => {
  const multiWords = (entryString) => entryString
    .match(/[a-zA-Z0-9]+/g)
    .reduce((lowerCaseStr, word) => {
      const lowerCaseWords = acronymsWords(word)
        .split(/(?=[A-Z])/)
        .map((acronymWord) => acronymWord.toLocaleLowerCase())
        .join(' ')
      return `${lowerCaseStr} ${lowerCaseWords}`
    }, '')

  const acronymsWords = (entryString) => {
    const acronymsCamelCase = entryString.replace(/[A-Z]+/g, (replacedString) => {
      if (replacedString.length > 2) {
        return replacedString
          .split('')
          .map((letter, idx, arr) => {
            if (idx === 0 || idx === arr.length -1) {
              return letter
            }
            return letter.toLocaleLowerCase()
          })
          .join('')
      }
      return replacedString
    })

    return `${acronymsCamelCase[0].toLocaleLowerCase() +
        acronymsCamelCase.slice(1, acronymsCamelCase.length - 1) +
        acronymsCamelCase[acronymsCamelCase.length - 1].toLocaleLowerCase()}`
  }

  return multiWords(string).trim()
}

export default lowerCase
