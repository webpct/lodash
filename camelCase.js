/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
const camelCase = (string) => {
  const isSingleWord = string.match(/[a-zA-Z0-9]+/g).length === 1

  const multiWords = (entryString) => entryString
    .match(/[a-zA-Z0-9]+/g)
    .reduce((camelCaseStr, word, idx) => {
      if (idx === 0) {
        return `${camelCaseStr}${word.toLocaleLowerCase()}`
      }

      if (/\D/.test(word)) {
        const wordWithDigit = word.match(/[a-z]+|\d+/gi)
        const digitalCamelCaseStr = wordWithDigit.reduce((digitCamelCaseStr, digitalWord) =>
          `${digitCamelCaseStr}${digitalWord[0].toUpperCase() +
            digitalWord.slice(1).toLocaleLowerCase()}`, '')

        return `${camelCaseStr}${digitalCamelCaseStr}`
      }

      return `${camelCaseStr}${word[0].toUpperCase() + word.slice(1).toLocaleLowerCase()}`
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

  return  isSingleWord ? acronymsWords(string) : multiWords(string)
}

export default camelCase

