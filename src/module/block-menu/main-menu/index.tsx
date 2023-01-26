import React from 'react'
import Heading1 from '../flatten-item-list/heading1'
import Heading2 from '../flatten-item-list/heading2'
import Heading3 from '../flatten-item-list/heading3'
import { Classes, Icon, Menu, MenuDivider, MenuItem } from '@blueprintjs/core'
import SubmenuFormat from '../custom-submenu/format'
import { appendTextToBlock, appendTextToFocusedBlock, getAllBlockUids, getFocusedBlockUid } from '../../../roam-sdk/roam'

interface MainMenuProps {

}

const MainMenu: React.FC<MainMenuProps> = () => {
  const handleGridLayoutTwoColumns = () => {
    const currentHoveredBlockId = window.sessionStorage.getItem('currentHoveredBlockId')
    appendTextToBlock(currentHoveredBlockId, '#.rm-grid2')
  }

  return <div className='main-menu'>
    <Menu className={Classes.ELEVATION_1}>
      {/* <MenuItem labelElement={ } onMouseOver={() => { }}></MenuItem> */}
      <SubmenuFormat></SubmenuFormat>

      <MenuItem icon="style" text="Style">
        <MenuItem icon="bold" text="background">
          <MenuItem icon="italic" text="Blue" onClick={() => {
            appendTextToBlock(window.sessionStorage.getItem('currentHoveredBlockId'), '#.rm-bg-orange-100')
          }} />
          <MenuItem icon="italic" text="orange" onClick={() => {
            appendTextToBlock(window.sessionStorage.getItem('currentHoveredBlockId'), '#.rm-bg-orange-200')
          }} />
          <MenuItem icon="italic" text="Teal" onClick={() => {
            appendTextToBlock(window.sessionStorage.getItem('currentHoveredBlockId'), '#.rm-bg-orange-300')
          }} />
        </MenuItem>

        <MenuItem icon="italic" text="Text Color">
          <MenuItem icon="italic" text="Blue" />
          <MenuItem icon="italic" text="orange" />
          <MenuItem icon="italic" text="Teal" />
        </MenuItem>
      </MenuItem>

      <MenuItem icon="layout" text="Layout">
        <MenuItem icon="grid" text="Two Columns" onClick={handleGridLayoutTwoColumns} />
        <MenuItem icon="layout-grid" text="Three Columns" />
        <MenuItem icon="new-grid-item" text="Four Columns" />
        <MenuItem icon="new-grid-item" text="Auto Fill">
          <MenuItem icon="grid" text="Column Width 100px" />
          <MenuItem icon="grid" text="Column Width 200px" />
          <MenuItem icon="grid" text="Column Width 300px" />
          <MenuItem icon="grid" text="Column Width 400px" />
          <MenuItem icon="grid" text="Column Width 500px" />
        </MenuItem>

      </MenuItem>

      <MenuItem icon={"box"} text="Custom SVG icon" />
      <MenuItem icon="new-text-box" text="New text box" />
      <MenuItem icon="new-object" text="New object" />
      <MenuItem icon="new-link" text="New link" />
      <MenuDivider />

      <MenuDivider title="Edit" />
      <MenuItem icon="cut" text="Cut" label="⌘X" />
      <MenuItem icon="duplicate" text="Copy" label="⌘C" />
      <MenuItem icon="clipboard" text="Paste" label="⌘V" disabled={true} />
      <MenuDivider title="Text" />

      <MenuItem disabled={true} icon="align-left" text="Alignment">
        <MenuItem icon="align-left" text="Left" />
        <MenuItem icon="align-center" text="Center" />
        <MenuItem icon="align-right" text="Right" />
        <MenuItem icon="align-justify" text="Justify" />
      </MenuItem>

      <MenuItem icon="asterisk" text="Miscellaneous">
        <MenuItem icon="badge" text="Badge" />
        <MenuItem icon="book" text="Long items will truncate when they reach max-width" />
        <MenuItem icon="more" text="Look in here for even more items">
          <MenuItem icon="briefcase" text="Briefcase" />
          <MenuItem icon="calculator" text="Calculator" />
          <MenuItem icon="dollar" text="Dollar" />
          <MenuItem icon="dot" text="Shapes">
            <MenuItem icon="full-circle" text="Full circle" />
            <MenuItem icon="heart" text="Heart" />
            <MenuItem icon="ring" text="Ring" />
            <MenuItem icon="square" text="Square" />
          </MenuItem>
        </MenuItem>
      </MenuItem>

      <MenuItem icon="cog" labelElement={<Icon icon="share" />} text="Settings..." intent="primary" />
    </Menu>
  </div>
}

export default MainMenu