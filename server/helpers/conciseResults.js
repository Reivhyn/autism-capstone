/*
 * this helper merges the results into a single array with no duplicates
 */

function conciseResults(arrayToSet) {
  //create empty array to hold full combined set
  const combinedArray = []

  //merge all rrays into one
  arrayToSet.forEach((el) => {
    combinedArray.push(...el)
  })

  //create empty map to work with
  const uniqueResults = new Map()

  //use id as unique key
  combinedArray.forEach((el) => uniqueResults.set(el._id, el))

  //return values  from the map as an array
  return Array.from(uniqueResults.values())
}

module.exports = { conciseResults }
