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
  email,
  chatAccess
) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/users/updateUser`, {
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
        ...(email && { email }),
        ...(chatAccess && { chatAccess }),
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
    const res = await fetch(`http://127.0.0.1:4000/user/delete-user`, {
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
        ...(activitiesAccess &&
          userType === 'kid' && { activitiesAccess: activitiesAccess }),
        ...(parentUser && userType === 'kid' && { parentUser }),
        ...(disabled && { disabled }),
        portalReg: true,
      }),

      credentials: 'include',
    })

    const addedUser = await res.json()

    if (!res.ok) {
      throw new Error(addedUser.message || 'edit user fetch failed')
    }

    return addedUser
  } catch (error) {
    console.log(error)
  }
}

// Fetch to add an activity
export async function addNewActivity(
  activityType,
  activityTitle,
  description,
  url,
  imageURL,
  category,
  searchKeywords,
  ageRange
) {
  try {
    const res = await fetch('http://127.0.0.1:4000/activities/addActivity', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...(activityType && { activityType }),
        ...(activityTitle && { activityTitle }),
        ...(description && { description }),
        ...(url && { url }),
        ...(imageURL && { imageURL }),
        ...(category && { category }),
        ...(searchKeywords && { searchKeywords }),
        ...(ageRange && { ageRange }),
        portalReg: true,
      }),

      credentials: 'include',
    })

    const addedActivity = await res.json()
    console.log('added activity', addedActivity)

    if (!res.ok) {
      throw new Error(addedActivity.message || 'add activity fetch failed')
    }

    return addedActivity
  } catch (error) {
    console.log(error)
  }

}

// Fetch to edit an activity
export async function editActivity(
  id,
  activityType,
  activityTitle,
  description,
  url,
  imageURL,
  category,
  searchKeywords
) {
  try {
    console.log('edit activity fetch hit')
    const res = await fetch('http://127.0.0.1:4000/activities/updateActivity', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...(id && { id }),
        ...(activityType && { activityType }),
        ...(activityTitle && { activityTitle }),
        ...(description && { description }),
        ...(url && { url }),
        ...(imageURL && { imageURL }),
        ...(category && { category }),
        ...(searchKeywords && { searchKeywords }),
        portalReg: true,
      }),

      credentials: 'include',
    })

    const editedActivity = await res.json()

    if (!res.ok) {
      throw new Error(editedActivity.message || 'edit activity fetch failed')
    }

    return editedActivity
  } catch (error) {
    console.log(error)
  }
}

// Fetch to delete an activity
export async function deleteActivity(id) {
  try {
    console.log('delete activity fetch hit')
    const res = await fetch('http://127.0.0.1:4000/activities/deleteActivity', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),

      credentials: 'include',
    })

    const deletedActivity = await res.json()

    if (!res.ok) {
      throw new Error(deletedActivity.message || 'delete activity fetch failed')
    }

    return deletedActivity
  }catch (error) {
    console.log(error)
  }
}
//get all chatTipics
export async function getAllChatTopics() {
  try {
    const res = await fetch(
      `http://127.0.0.1:4000/chatTopics/getAllChatTopics`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )

    const allChatTopics = await res.json()

    if (!res.ok) {
      throw new Error(allChatTopics.message || 'Get all chat topics failed')
    }

    return allChatTopics
  } catch (error) {
    console.log(error)
  }
}

//edit chat topic
export async function editChatTopic(id, topicTitle, description, ageRange) {
  try {
    const res = await fetch(
      `http://127.0.0.1:4000/chatTopics/updateChatTopic`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(id && { id }),
          ...(topicTitle && { topicTitle }),
          ...(description && { description }),
          ...(ageRange && { ageRange }),
        }),
        credentials: 'include',
      }
    )

    const editedTopic = await res.json()

    if (!res.ok) {
      throw new Error(editedTopic.message || 'Edit chat topics failed')
    }

    return editedTopic
  } catch (error) {
    console.log(error)
  }
}
//edit chat topic
export async function addChatTopic(topicTitle, description, ageRange) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/chatTopics/creatChatTopic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topicTitle: topicTitle,
        description: description,
        ageRange: ageRange,
      }),
      credentials: 'include',
    })

    const editedTopic = await res.json()

    if (!res.ok) {
      throw new Error(editedTopic.message || 'Edit chat topics failed')
    }

    return editedTopic
  } catch (error) {
    console.log(error)
  }
}

//delete chat topic
export async function deleteChatTopic(id) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/chatTopics/deleteTopic`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
      credentials: 'include',
    })

    const deletedTopic = await res.json()

    if (!res.ok) {
      throw new Error(deletedTopic.message || 'Delete chat topics failed')
    }

    return deletedTopic
  } catch (error) {
    console.log(error)
  }
}
