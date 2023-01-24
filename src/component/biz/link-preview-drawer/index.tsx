import { Drawer } from '@blueprintjs/core'
import React, {useState, useEffect} from 'react'
import ReactDom from 'react-dom'
import SideDrawer from '../../common/drawer';

interface MyDrawerProps {
  title: string;
  url: string;
}
const MyDrawer: React.FC<MyDrawerProps> = ({ title, url }) => {
  return <SideDrawer title={title} url={url}></SideDrawer>
}

export default MyDrawer