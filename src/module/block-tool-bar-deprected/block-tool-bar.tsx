import { ButtonGroup, Button, AnchorButton } from '@blueprintjs/core'
import React from 'react'
import ReactDom from 'react-dom'

const BlockToolBar: React.FC = () => {
  return <ButtonGroup minimal={true}>
    <Button icon="database">Queries</Button>
    <Button icon="function">Functions</Button>
    <AnchorButton rightIcon="caret-down">Options</AnchorButton>
</ButtonGroup>
}

export default BlockToolBar