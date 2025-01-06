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
