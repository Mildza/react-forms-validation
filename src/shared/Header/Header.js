import React from 'react'
import { NavLink  } from "react-router-dom";
import './Header.scss'

const Header = () => {
  return (
      <nav>
        <li><NavLink to='/simple'>Simple</NavLink></li>
        <li><NavLink to='/complex'>Complex</NavLink></li>
      </nav>
  )
}

export default Header