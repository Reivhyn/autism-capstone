/*
 * this file contains all the fetches used by the front end
 */

// get all activities
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
  
      credentials: "include"
    })

    const activities = await res.json()

    if(!res.ok){
      const errorData = await res.json()
      throw new Error(errorData.message || 'Get activities failed');
      
    }
  
    console.log('getActivities helper - activities', activities)
    return activities
    
  } catch (error) {
    console.log(error)
  }
}
