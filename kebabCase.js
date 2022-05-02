/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @see camelCase, lowerCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * kebabCase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 */
const kebabCase = (string) => {
  const multiWords = (entryString) => entryString
    .match(/[a-zA-Z0-9]+/g)
    .reduce((lowerCaseStr, word, idx) => {
      const lowerCaseWords = acronymsWords(word)
        .split(/(?=[A-Z])/)
        .map((acronymWord) => acronymWord.toLocaleLowerCase())
        .join('-')
      return idx === 0 ? `${lowerCaseStr} ${lowerCaseWords}` : `${lowerCaseStr}-${lowerCaseWords}`
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

export default kebabCase
