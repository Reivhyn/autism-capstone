/* eslint-disable no-unused-vars */
/*
 * this file contains all the fetches used by the front end
 */

//register fetch
export async function register(
  userName,
  firstName,
  lastName,
  email,
  password,
  dob,
  userType
) {
  try {
    console.log(userName, firstName, lastName, email, password, dob, userType)

    const res = await fetch(`http://127.0.0.1:4000/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        dob: dob,
        userType: userType,
        kids: [],
        parentUser: 'none',
        gamesAccess: ['all'],
        learningAccess: ['all'],
        chatAccess: ['all'],
      }),

      credentials: 'include',
    })

    const loginData = await res.json()

    console.log(loginData)
    if (!res.ok) {
      throw new Error(loginData.message || 'Registration Failed')
    }

    return loginData
  } catch (error) {
    console.log(error)
  }
}

// log in fetch
export async function logIn(userName, password) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),

      credentials: 'include',
    })

    const loginData = await res.json()

    if (!res.ok) {
      throw new Error(loginData.message || 'Login Failed')
    }

    return loginData
  } catch (error) {
    console.log(error)
  }
}

// get all activities for user
export async function getActivities(userId) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/activities/getActivities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
      }),

      credentials: 'include',
    })

    const activities = await res.json()

    if (!res.ok) {
      throw new Error(activities.message || 'Get activities failed')
    }

    return activities
  } catch (error) {
    console.log(error)
  }
}

//get all users for admin
export async function getAllUsers() {
  try {
    const res = await fetch(`http://127.0.0.1:4000/users/getAllUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),

      credentials: 'include',
    })

    const allUsers = await res.json()

    if (!res.ok) {
      throw new Error(allUsers.message || 'Get all users fetch failed')
    }

    console.log('allUsers', allUsers)
    return allUsers
  } catch (error) {
    console.log(error)
  }
}

// get kids of logged in user
export async function findKidsOfParent(userData) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/users/findKidsOfParent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userData._id,
      }),

      credentials: 'include',
    })

    const kidsOfParent = await res.json()

    if (!res.ok) {
      throw new Error(kidsOfParent.message || 'Get kids of user fetch failed')
    }

    return kidsOfParent
  } catch (error) {
    console.log(error)
  }
}

// fetch to update user
export async function editUser(
  id,
  firstName,
  lastName,
  dob,
  userName,
  password,
  disabled,
  activitiesAccess,
  email
) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/auth/updateUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(id && { id }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(dob && { dob }),
        ...(userName && { userName }),
        ...(password && { password }),
        ...(disabled && { disabled }),
        ...(activitiesAccess && { activitiesAccess }),
        ...(email && {email})
      }),

      credentials: 'include',
    })

    const editedUser = await res.json()

    if (!res.ok) {
      throw new Error(editedUser.message || 'edit user fetch failed')
    }

    return editedUser
  } catch (error) {
    console.log(error)
  }
}

// fetch to delete user user
export async function deleteUser(id) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/auth/delete-user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),

      credentials: 'include',
    })

    const deletedUser = await res.json()

    if (!res.ok) {
      throw new Error(deletedUser.message || 'Get kids of user fetch failed')
    }

    return deletedUser
  } catch (error) {
    console.log(error)
  }
}

// fetch to update user
export async function addNewUser(
  firstName,
  lastName,
  dob,
  userName,
  password,
  disabled,
  activitiesAccess,
  email,
  userType,
  parentUser
) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(userType && { userType }),
        ...(userName && { userName }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(dob && { dob }),
        ...(email && { email }),
        ...(password && { password }),
        ...(activitiesAccess && { activitiesAccess: activitiesAccess }),
        ...(parentUser && { parentUser }),
        ...(disabled && { disabled }),
        portalReg: true,
      }),

      credentials: 'include',
    })

    const addedUser = await res.json()
    console.log('addedUser', addedUser)

    if (!res.ok) {
      throw new Error(addedUser.message || 'edit user fetch failed')
    }

    return addedUser
  } catch (error) {
    console.log(error)
  }
}