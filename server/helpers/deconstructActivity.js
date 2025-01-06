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
    imagebuffer,
    imageType,
    category,
    educational,
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
    if (activityType !== 'game' && activityType !== 'learning')
      throw new Error("activityType must either 'learning' or 'game'")

    if (!activityTitle) throw new Error('Provide a value for activityTitle ')

    if (!description) throw new Error('Provide a value for desription')

    if (!imageType) throw new Error('provide a value for imageType')

    if (category.length === 0) throw new Error('provide values for category')

    if (educational === undefined)
      throw new Error('Value for educational must be true or false')

    if (searchKeywords.length === 0)
      throw new Error('Provide values for searchKeywords')

    if (ageRange.length === 0) throw new Error('Provide values for ageRange')
  }
}

module.exports = { deconstructActivity }
