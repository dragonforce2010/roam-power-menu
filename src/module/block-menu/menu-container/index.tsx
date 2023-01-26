import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import BlockMenuTrigger from '../menu-trigger'
import MainMenu from '../main-menu'
import './index.css'

interface MenuContainerProps {

}

const MenuContainer: React.FC<MenuContainerProps> = () => {
  const [visual, setVisual] = useState(false)

  const showMainMenu = () => {
    setVisual(true)
  }

  const hideMainMenu = () => {
    setVisual(false)
  }

  return <div className='block-menu-container' onMouseOver={showMainMenu}>
    <BlockMenuTrigger></BlockMenuTrigger>
    {visual && (<MainMenu></MainMenu>)}
  </div>
}

export default MenuContainer