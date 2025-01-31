/*
 * this file contains all the helpers used on the front end
 */

// changes the use state on click to display a new page
export function changePage(setPageToDisplay, newPage) {
  setPageToDisplay(newPage)
}

// runs a search on returned activities
export function runSearch(arrayToSearch, searchTerm) {
  console.log('searchTerm', searchTerm)
  console.log('arrayToSearch', arrayToSearch)

  const combinedArray = []

  combinedArray.push(
    ...arrayToSearch.filter((result) =>
      result.activityTitle.match(new RegExp(searchTerm, 'i'))
    )
  )

  combinedArray.push(
    ...arrayToSearch.filter((result) =>
      result.searchKeywords.some((keyword) =>
        keyword.match(new RegExp(searchTerm, 'i'))
      )
    )
  )

  combinedArray.push(
    ...arrayToSearch.filter((result) =>
      result.ageRange.some((ageRange) =>
        ageRange.match(new RegExp(searchTerm, 'i'))
      )
    )
  )

  //create empty map to work with
  const uniqueResults = new Map()

  //use id as unique key
  combinedArray.forEach((el) => uniqueResults.set(el._id, el))

  //return values  from the map as an array
  return Array.from(uniqueResults.values())
}

/*
 * this sets password criteria the min lenght is 10 characters and it must contain upper & lower case number and symbol
 */

export function validatePasswordCriteria(password) {
  //GLOBALS

  //determins the min lenght allowed
  const minLength = 8

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
  if (password.length <= minLength) {
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
  ) throw new Error(
    `The password does not meet the criteria
  it must be 
  ${minLength} characters long,
  have an upper and lower case character
  a number and symbol.`
  )
}


