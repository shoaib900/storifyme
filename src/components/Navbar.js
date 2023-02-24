import React from 'react'
import '../assets/css/Navbar.css'
import { SlidesContext } from '../providers/Slides'
import { TopNav, LayerDesignNav } from './Editor/SideBar/Headers'
import '../assets/css/Navbar.css'

const Navbar = ({ openAnimationPanel }) => {
  return (
    <div>
      <TopNav />
      <LayerDesignNav openAnimationPanel={openAnimationPanel} />
    </div>
  )
}

export default Navbar
