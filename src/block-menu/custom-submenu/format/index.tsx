import React from 'react'
import Heading1 from '../../flatten-item-list/heading1'
import Heading2 from '../../flatten-item-list/heading2'
import Heading3 from '../../flatten-item-list/heading3'

const SubmenuFormat: React.FC = () => {
  return <div className='flatten-item-list'>
    <Heading1></Heading1>
    <Heading2></Heading2>
    <Heading3></Heading3>
    <Heading1></Heading1>
    <Heading2></Heading2>
    <Heading3></Heading3>
    <Heading1></Heading1>
    <Heading2></Heading2>
    <Heading3></Heading3>
  </div>
}

export default SubmenuFormat