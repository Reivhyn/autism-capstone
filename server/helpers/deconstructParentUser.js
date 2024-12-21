/*
    * this makes sure the request coming into the endpoint has the correct keeys for it to function correctly

    * it takes the user object (usually req.body) and a flag which indicats a use case which will check for differnt information accordinly
    * no flag checks for all items
*/

function deconstructParentUser(userObject, flag) {
  const { userName, firstName, lastName, email, password } = userObject

  if (flag === 'login') {
    if (!email || !password)
      throw new Error('To log in provide email and password')
    return
  }

  if (!userName || !firstName || !lastName || !email || !password) {
    throw new Error(
      'userName, firstName, lastName, email, and password required to create a new parentUser'
    )
  }
}

module.exports = { deconstructParentUser }
