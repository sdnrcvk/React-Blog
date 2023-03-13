import { createContext } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {

  return (
    <ThemeContext.Provider value={{bgColor:"#778beb"}}>
      {children}
    </ThemeContext.Provider>
  )
}
