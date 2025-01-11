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
  dob
) {
  try {
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
        kids: [],
        parentUser: 'none',
        gamesAccess: ['all'],
        learningAccess: ['all'],
        chatAccess: ['all'],
      }),

      credentials: 'include',
    })

    const loginData = await res.json()

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

    console.log('loginData', loginData)

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

    console.log('activites', activities)

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
      body: JSON.stringify({
      }),

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
        userData
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