import { createContext, useReduce, useState, useEffect } from "react"
import themeModeReducer from "./themeModeReducer"

const INITIAL_STATE = {
    theme: 'light',
    switchTheme: () => {}
}

// export const ThemeModeContext = createContext(INITIAL_STATE)


// export const ThemeModeContextProvider = ({children}) => {
//     const [state, dispatch] = useReducer(themeModeReducer, INITIAL_STATE)
//     return (
//     <ThemeModeContext.Provider value={{mode:state.mode, dispatch}}>
//         {children}
//     </ThemeModeContext.Provider>
//     );
// }


const ThemeContext = createContext(INITIAL_STATE)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const themeName = localStorage.getItem('theme')
    setTheme(themeName)
  }, [theme])

  const switchTheme = (themeName) => {
    localStorage.setItem('theme', themeName)
    setTheme(themeName)
  }


  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
