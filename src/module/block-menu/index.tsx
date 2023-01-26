import React from 'react'
import "./index.css"
import ReactDOM from 'react-dom'
import MenuContainer from './menu-container'
import { getBlockIdFromHTMLEleId } from '../../roam-sdk/roam'

let lastEle: HTMLElement
let lastRoot: HTMLElement
let menuTriger = React.createElement(MenuContainer)

const onMouseEnter = (e: MouseEvent) => {
  const ele = (e.target as HTMLElement).closest('.rm-block') as HTMLElement

  let root = document.createElement('div')

  if (lastRoot) {
    lastRoot.remove()
  }

  lastRoot = root
  lastEle = ele

  if (!ele) {
    return
  }

  const currentHoveredBlockId = getBlockIdFromHTMLEleId(ele.id)
  console.log('ele.id currentHoveredBlockId:', currentHoveredBlockId)
  window.sessionStorage.setItem('currentHoveredBlockId', currentHoveredBlockId)
  console.log('get item from session storage', window.sessionStorage.getItem('currentHoveredBlockId'))

  ReactDOM.render(menuTriger, root)
  root.style.position = 'fixed'
  root.style.top = ele.getBoundingClientRect().top + 4 + "px" // 4px padding
  root.style.right = window.innerWidth - ele.getBoundingClientRect().left - 8 + "px"

  document.body.appendChild(root)
}

function onload() {
  document.querySelector('.rm-block-children').addEventListener('mouseenter', onMouseEnter, true)

}

function onunload() {
  document.querySelector('.rm-block-children').removeEventListener('mouseenter', onMouseEnter, true)
}

export default {
  onload: onload,
  onunload: onunload,
}