/*
 * This helper filters results from server to match specific criteria

  * result object is the list of dcouments to be filtered
  * serchTerm is the term being searched
  * the filtertyper is how the lish should be filtered
 */

function filterResults(resultsObject, searchTerm, filterType) {
  // return all games
  if (filterType === 'game') {
    return resultsObject.filter((activity) => activity.activityType === 'game')
  }

  // return all learnig activities
  if (filterType === 'learning') {
    return resultsObject.filter(
      (activity) => activity.activityType === 'learning'
    )
  }

  // return matching title
  if (filterType === 'title') {
    return resultsObject.filter((result) =>
      result.activityTitle.match(new RegExp(searchTerm, 'i'))
    )
  }

  // return matching keyword
  if (filterType === 'keyWord') {
    return resultsObject.filter((result) =>
      result.searchKeywords.some((keyword) =>
        keyword.match(new RegExp(searchTerm, 'i'))
      )
    )
  }

  // return all games matching age range
  if (filterType === 'age') {
    return resultsObject.filter((result) =>
      result.ageRange.some((ageRange) =>
        ageRange.match(new RegExp(searchTerm, 'i'))
      )
    )
  }
}

module.exports = { filterResults }
