/*
    * this makes sure the request coming into the endpoint has the correct keeys for it to function correctly

    * it takes name, description, url, image url, category and search keywords (usually req.body) and a flag which indicats a use case which will check for differnt information accordinly
    * no flag checks for all items
*/

function deconstructActivity(gameObject, flag) {
  const {
    id,
    activityType,
    activityTitle,
    description,
    url,
    imageURL,
    category,
    searchKeywords,
    ageRange,
    } = gameObject
    
  if (flag === 'update') {
    if (!id) throw new Error('Provide id of the activity do be updated')
    return
  }

  if (flag === 'delete') {
    if (!id) throw new Error('Provide id of the activity do be deleted')
    return
  }

  if (!flag) {
    if (!activityTitle) throw new Error('Provide a value for activityTitle ')

    if (!description) throw new Error('Provide a value for desription')

    if (category.length === 0) throw new Error('provide values for category')

    if (searchKeywords.length === 0)
      throw new Error('Provide values for searchKeywords')
console.log(ageRange)
    if (ageRange.length === 0) throw new Error('Provide values for ageRange')
  }
}

module.exports = { deconstructActivity }
