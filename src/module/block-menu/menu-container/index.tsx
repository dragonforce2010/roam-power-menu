import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Classes, Popover2 } from "@blueprintjs/popover2";
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

  return <div className='block-menu-container'>

    {/* {visual && (<MainMenu></MainMenu>)} */}

    <Popover2
      interactionKind="hover"
      popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
      placement="auto"
      content={
        <MainMenu></MainMenu>
      }
    >
      <BlockMenuTrigger></BlockMenuTrigger>
    </Popover2>
  </div>
}

export default MenuContainer