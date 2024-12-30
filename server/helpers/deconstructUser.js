/*
    * this makes sure the request coming into the endpoint has the correct keeys for it to function correctly

    * it takes the user type, the user object (usually req.body) and a flag which indicats a use case which will check for differnt information accordinly
    * no flag checks for all items
*/

function deconstructParentUser(userObject, flag) {
  const { userName, firstName, lastName, email, password } = userObject

  if (flag === 'login') {
    if (!email || !password)
      throw new Error('To login provide email and password')
    return
  }

  if (!userName || !firstName || !lastName || !email || !password) {
    throw new Error(
      'userName, firstName, lastName, email, and password required to create a new parentUser'
    )
  }
}

function deconstructAdminUser(userObject, flag) {
  const { userName, firstName, lastName, email, password } = userObject

  if (flag === 'login') {
    if (!email || !password)
      throw new Error('To login provide email and password')
    return
  }

  if (!userName || !firstName || !lastName || !email || !password) {
    throw new Error(
      'userName, firstName, lastName, email, and password required to create a new adminUser'
    )
  }
}

function deconstructKidUser(userObject, flag) {
  const { userName, firstName, lastName, email, password, dob, parentUser } =
    userObject

  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !dob ||
    !parentUser
  ) {
    if (flag === 'login') {
      if (!email || !password)
        throw new Error('To login provide email and password')
      return
    }

    throw new Error(
      'userName, firstName, lastName, email, dod, parrentUser and password required to create a new kidUser'
    )
  }
}

function deconstructUser(userType, userObject, flag) {
  if (userType === 'parent') deconstructParentUser(userObject, flag)

  if (userType === 'admin') deconstructAdminUser(userObject, flag)

  if (userType === 'kid') deconstructKidUser(userObject, flag)
}
module.exports = { deconstructUser }
