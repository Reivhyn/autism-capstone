/* eslint-disable no-unused-vars */
/* 
  * this context provides the page to display information to all the components
*/

import React, { createContext, useState } from 'react'

// pdt -> page to display 
export const ptdContext = createContext('landing')

// userdata context 
export const userDataContext = createContext('')

//user id context
export const KidsOfParentContext = createContext('')

//creates an object to target for editing users
export const editTargetContext = createContext('')

