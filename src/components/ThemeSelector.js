import { useTheme } from "../hooks/useTheme";
import "./ThemeSelector.css"
import React from 'react'

const themeColors=["#778beb","#cf6a87","#f8a5c2","#e77f67"]


export default function ThemeSelector() {
    const {changeColor}=useTheme();

  return (
    <div className="theme-selector">
        <div className="theme-buttons">
            {themeColors.map(color=>(
                <div key={color} onClick={()=>changeColor(color)} style={{
                    backgroundColor:color
                }}>

                </div>
            ))}
        </div>
    </div>
  )
}
