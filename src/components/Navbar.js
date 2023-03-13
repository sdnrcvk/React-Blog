import { Link } from "react-router-dom";
import './Navbar.css'
import React from 'react'
import Searchbar from "./Searchbar";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const {bgColor}=useTheme();

  return (
    <div className="navbar" style={{background:bgColor}}>
        <nav>
            <Link to="/" className="brand">
                <h1>SC Blog</h1>
            </Link>
            <Searchbar/>
            <Link to="/create">
                Yeni Yazı
            </Link>
        </nav>
    </div>
  )
}
