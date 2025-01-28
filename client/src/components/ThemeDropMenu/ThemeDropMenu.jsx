import { useState, useContext, useEffect } from 'react'
import './themDropMenu.css'

// MATERIAL-UI IMPORTS
import { activeThemeContext } from '../zContextHooks/contextHooks'

const ThemeDropMenu = () => {
  //* USESTATE
  const [displayList, setdisplayList] = useState('')
  const [activeTheme, setActiveTheme] = useContext(activeThemeContext)

  //array that has names of all themes
  const themeStringNamesArr = ['dark', 'evening', 'moon', 'synth', 'day']




  //* USEEFFECT

  //render list
  useEffect(() => {
    setdisplayList(
      themeStringNamesArr.map((theme) => {
        return (
          <div
            className="themeNames"
            key={theme}
            onClick={() => setActiveTheme(theme)}
          >
            {theme}
          </div>
        )
      })
    )
  },[])

  //* RENDER
  return (
    <div className="dropMenu">
      <div>THEME: {activeTheme}</div>
      <div className="dropContent">
        {/* button to go home */}
        {displayList ? displayList : 'test'}
      </div>
    </div>
  )
}

export default ThemeDropMenu
