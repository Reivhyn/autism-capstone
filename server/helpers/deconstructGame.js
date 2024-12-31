/*
    * this makes sure the request coming into the endpoint has the correct keeys for it to function correctly

    * it takes name, description, url, image url, category and search keywords (usually req.body) and a flag which indicats a use case which will check for differnt information accordinly
    * no flag checks for all items
*/

function deconstructGame(gameObject, flag) {
  const {
    gameTitle,
    description,
    url,
    imageURL,
    imageBuffer,
    imageType,
    category,
    educational,
    searchKeywords,
    ageRange,
  } = gameObject

  if (flag === 'delete'){
    if(!gameTitle)
      throw new Error("Provide title of game to be deleted");
      return
  }

  if (
    !gameTitle ||
    !description ||
    !url ||
    !imageURL ||
    !category ||
    !searchKeywords
  ) {
    throw new Error(
      'Provide gameTitle, description, url, imageUrl, category and searchKeywords to create a game '
    )
  }
}

module.exports = { deconstructGame }
