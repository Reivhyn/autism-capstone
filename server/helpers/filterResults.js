/*
 * Splits all actticities into learning or game activities
 */

function filterResults(resultsObject, filterType) {
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
}

module.exports = { filterResults }
