/*
    * this makes sure the request coming into the endpoint has the correct keeys for it to function correctly

    * it takes the user type, the user object (usually req.body) and a flag which indicats a use case which will check for differnt information accordinly
    * no flag checks for all items
*/

function deconstructUser(userObject, flag) {
  const {userType, userName, firstName, lastName, dob, email, password, kids, parentUser, gamesAccess, chatAccess, learningAccess } = userObject

  if(!userType || !userName || !firstName || !lastName || !dob || !email || !password){
    throw new Error("userType, userName, firstName, lastName, dob, email and password are needed to create a new user ");
    return
  }
}
module.exports = { deconstructUser }
