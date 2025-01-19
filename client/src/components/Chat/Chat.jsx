/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './chat.css'

//COMPONENT IMPORTS
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import SiteTitle from '../SiteTitle/SiteTitle'

//CONTEXT IMPORTS
// pdt -> page to display
import { ptdContext } from '../zContextHooks/contextHooks'
import { use } from 'react'
import { FaSleigh } from 'react-icons/fa'

const Chat = () => {
  //* USESTATE
  //determins which page to display
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [prompt, setPrompt] = useState('')
  const [geminiStream, setGeminiStream] = useState('')
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [displayLog, setDisplayLog] = useState([])

  //* FUNCTION
  const callGemini = async (e) => {
    try {
      e.preventDefault()

      setIsLoading(true)
      setGeminiStream('')

      const res = await fetch(`http://127.0.0.1:4000/chat/gemini`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          history: history,
        }),

        credentials: 'include',
      })

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let streamedText = ''
      let jsonData = ''

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const deccodedChunk = decoder.decode(value, { stream: true })

        // break up by lines starting with TEXT
        const lines = deccodedChunk.split('\n')
        lines.forEach((line) => {
          //extract text
          if (line.startsWith('TEXT')) {
            const chunk = line.replace('TEXT: ', '')
            streamedText += chunk + '\n'
          }

          if (line.startsWith('JSON')) {
            //get json data and parse
            try {
              const jsonChunk = line.replace('JSON', '').trim()
              jsonData = JSON.parse(jsonChunk)
            } catch (error) {
              console.log('error parsing JSON', error)
            }
          }
        })
        setGeminiStream(streamedText)
        setHistory(jsonData)
      }
    } catch (error) {
      // if(!res.ok) throw new Error(res.message || 'gemini fetch failed');
      console.log('Streaming error', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (history) {
      console.log('history', history)
    }
  }, [history])

  const RenderLog = () => {
    if (history) {
      setDisplayLog(history.map((log, i) => {
        return <div key={`log${i}`}>{log.parts}</div>
      }))
    }
  }

  //* RENDER
  return (
    <>
      <SiteTitle />
      <h1>CHAT PAGE</h1>
      <div className="chatHistoryWrapper">
        <pre className="history">{displayLog ? displayLog : ''}</pre>
        <pre className="currentResponce">{geminiStream}</pre>
      </div>
      <form action="">
        <textarea
          name=""
          id=""
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value)
          }}
        ></textarea>
        <button onClick={(e) => callGemini(e)} disabled={isLoading}>
          Ask Gemini
        </button>
      </form>
      <Banner />
      <Footer />
    </>
  )
}

export default Chat
