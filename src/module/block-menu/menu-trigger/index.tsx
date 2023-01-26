import { Icon } from '@blueprintjs/core'
import React from 'react'
import "./index.css"

interface BlockMenuTriggerProps {
}

const BlockMenuTrigger: React.FC<BlockMenuTriggerProps> = () => {
  return <div className='block-menu-trigger' >
    <span><Icon icon={"property"} size={20}></Icon></span>
    <span><Icon icon={"drag-handle-vertical"} size={20}></Icon></span>
  </div>
}

export default BlockMenuTrigger