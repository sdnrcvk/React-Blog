import { useTheme } from "../hooks/useTheme";
import "./ThemeSelector.css"
import React from 'react'
import modeIcon from "../assets/modeIcon.svg"

const themeColors=["#778beb","#cf6a87","#f8a5c2","#e77f67"]


export default function ThemeSelector() {
    const {changeColor, changeMode, mode}=useTheme();

    const toggleMode=()=>{
        
        changeMode(mode==="dark" ? "light":"dark")

    }

    console.log(mode);

  return (
    <div className="theme-selector">
        <div className="mode-toggle">
            <img onClick={toggleMode} src={modeIcon} style={{filter:mode === "dark" ? "invert(100%)" : "invert(20%)"}}
            alt="dark/light toggle icon"/>
        </div>
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
