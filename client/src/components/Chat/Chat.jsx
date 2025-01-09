/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './chat.css'

//COMPONENT IMPORTS
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import DropMenu from '../DropMenu/DropMenu'
import SiteTitle from '../SiteTitle/SiteTitle'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'
import { use } from 'react'

const Chat = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [geminiStream, setGeminiStream] = useState('')
  const [prompt, setPrompt] = useState('')
  
  //* FUNCTION
  const handleClick = async () => {
    geminiStream
  }

  //* USEEFFECT
  useEffect(() => {
    const geminiStream = new EventSource('http://127.0.0.1:4000/chat/gemini')

    EventSource.onmessage = (event) => {
      // close connection when stream is complete
      if (event.data === '[DONE]'){
        EventSource.close(); 
      }

      // append incoming data to existing data
      setGeminiStream((prev) => prev + event.data)

      EventSource.onerror = (error) => {
        console.log('error occoured', error) //TODO make so i can display to user
        EventSource.close()
      }
      return () => {
        // cleanup
        EventSource.close() 
      }

    }
  },[])
  
  //* RENDER
  return (
    <>
      <SiteTitle />
      <h1>CHAT PAGE</h1>
      <DropMenu />
      <p>{geminiStream}</p>
      <form action="">
      <textarea name="" id="" value={prompt} onChange={(e)=> {setPrompt(e.target.value)}}></textarea>
      <button onClick={() => handleClick()}>Ask Gemini</button>
      </form>
      <Banner />
      <Footer />
    </>
  )
}

export default Chat
