import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

const themeReducer=(state,action)=>{
  switch(action.type){
    case 'CHANGE_COLOR':
      return {...state,bgColor:action.payload}

  }
}
export function ThemeProvider({ children }) {

  const [state, dispatch]=useReducer(themeReducer,{
    bgColor:"#778beb"
  })

  const changeColor=(color)=>{
    dispatch({type:"CHANGE_COLOR", payload:color})
  }

  return (
    <ThemeContext.Provider value={{...state, changeColor}}>
      {children}
    </ThemeContext.Provider>
  )
}
