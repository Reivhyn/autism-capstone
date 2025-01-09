/*
    * this makes sure the request coming into the endpoint has the correct keeys for it to function correctly

    * it takes the user type, the user object (usually req.body) and a flag which indicats a use case which will check for differnt information accordinly
    * no flag checks for all items
*/

function deconstructUser(userObject, flag) {
  const {
    id,
    userType,
    userName,
    firstName,
    lastName,
    dob,
    email,
    password,
    kids,
    parentUser,
    gamesAccess,
    chatAccess,
    learningAccess,
  } = userObject

  //flag for login in
  if (flag === 'login') {
    if (!userName || !password)
      throw new Error('userName and password are needed to log in')
    return
  }

  if (flag === 'delete' || flag === 'update' || flag === 'findKidsOfParent') {
    if (!id) throw new Error(`id required to perform ${flag} function`)
    return
  }

  if (!userType) throw new Error('usertype not on')
  if (!userName) throw new Error('username not on')
  if (!firstName) throw new Error('first name not on')
  if (!lastName) throw new Error('last name not on')
  if (!dob) throw new Error('dob not on')
  if (!email) throw new Error('email usertype not on')
  if (!password) throw new Error('pwd not on')

  //no flag used when creating a new user
  // if (

  //   !userType ||
  //   !userName ||
  //   !firstName ||
  //   !lastName ||
  //   !dob ||
  //   !email ||
  //   !password
  // ) {
  //   throw new Error(
  //     'userType, userName, firstName, lastName, dob, email and password are needed to create a new user '
  //   )
  // }
}
module.exports = { deconstructUser }
