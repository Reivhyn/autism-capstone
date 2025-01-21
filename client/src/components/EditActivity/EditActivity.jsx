/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './EditActivity.css'

// COMPONENET IMPORTS
import SiteTitle from '../SiteTitle/SiteTitle'
import Footer from '../Footer/Footer'
import LogoutButton from '../LogoutButton/LogoutButton'

// CONTEXT IMPORTS
// pdt -> page to display
import {
  ptdContext,
  userDataContext,
  KidsOfParentContext,
  editTargetContext,
} from '../zContextHooks/contextHooks'

// FETCH IMPORTS
import { addNewActivity } from '../zzzFetches/fetches'

const EditActivity = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData, setUserData] = useContext(userDataContext)

  // usestates for adding activity
  const [activityType, setActivityType] = useState('')
  const [activityTitle, setActivityTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, seturl] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [imagebuffer, setImagebuffer] = useState('')
  const [imageType, setImageType] = useState('')
  const [category, setCategory] = useState('')
  const [educational, setEducational] = useState('')
  const [searchKeywords, setSearchKeywords] = useState('')

  // usestates for editing activity
  const [editActivityType, seteditActivityType] = useState('')
  const [editActivityTitle, seteditActivityTitle] = useState('')
  const [editDescription, seteditDescription] = useState('')
  const [editurl, setediturl] = useState('')
  const [editImageURL, seteditImageURL] = useState('')
  const [editImagebuffer, seteditImagebuffer] = useState('')
  const [editImageType, seteditImageType] = useState('')
  const [editCategory, seteditCategory] = useState('')
  const [editEducational, seteditEducational] = useState('')
  const [editSearchKeywords, seteditSearchKeywords] = useState('')

  //* FUNCTIONS
  const handlePageDisplay = async () => {}

  return <div>EditActivity</div>
}

export default EditActivity
