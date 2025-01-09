/*
 * this sets password criteria the min lenght is 10 characters and it must contain upper & lower case number and symbol
 */

function validatePasswordCriteria(password) {
  //GLOBALS

  //determins the min lenght allowed
  const minLength = 10

  //keeps track of wether meeting the criteria has failed
  let lengthFail = false
  let upperCaseFail = false
  let lowerCaseFail = false
  let symbolFail = false
  let numberFail = false
  // Regular expressions to check for the presence of uppercase, lowercase, number, and allowed symbols
  const upperCase = /[A-Z]/
  const lowerCase = /[a-z]/
  const number = /[0-9]/

  // Allowed symbols !@#$%^&*()_+-=[]{}|;:'",.<>?/~`
  const symbol = /[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/~`]/

  // Check if password is at least 10 characters long
  if (password.length < minLength) {
    lengthFail = true
  }

  //check if password meets type criteria
  if (!upperCase.test(password)) {
    upperCaseFail = true
  }
  if (!lowerCase.test(password)) {
    lowerCaseFail = true
  }
  if (!number.test(password)) {
    numberFail = true
  }
  if (!symbol.test(password)) {
    symbolFail = true
  }

  //if any fails trip throw error with what failed to meet criteria
  if (
    lengthFail ||
    upperCaseFail ||
    lowerCaseFail ||
    numberFail ||
    symbolFail
  ) {
    throw new Error(
      `The password does not meet the criteria
it must be ${minLength} characters long,
have an upper and lower case character
a number and symbol (allowed symbols !@#$%^&*()_+-=[]{}|;:'",.<>?/~)\n
      ${lengthFail ? 'Your password does not meet length requirements\n' : ''}${
        upperCaseFail ? 'Your password does not have an uppercase letter\n' : ''
      }${
        lowerCaseFail ? 'Your password does not have a lower case letter\n' : ''
      }${numberFail ? 'Your password does not have a number\n' : ''}${
        symbolFail ? 'Your password does not have an allowed symbol\n' : ''
      }`.trim()
    )
  }
}

module.exports = { validatePasswordCriteria }
