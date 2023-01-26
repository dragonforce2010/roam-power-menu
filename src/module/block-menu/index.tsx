import React from 'react'
import "./index.css"
import ReactDOM from 'react-dom'
import MenuContainer from './menu-container'
import { getBlockIdFromHTMLEleId, getBlockIdFromTarget } from '../../roam-sdk/roam'

let lastEle: HTMLElement
let lastRoot: HTMLElement
let menuTriger = React.createElement(MenuContainer)

const onMouseEnter = (e: MouseEvent) => {
  // const ele = (e.target as HTMLElement).closest('.rm-block') as HTMLElement
  const ele = (e.target as HTMLElement).closest('.rm-block__input') as HTMLElement

  let root = document.createElement('div')

  if (lastRoot) {
    lastRoot.remove()
  }

  lastRoot = root
  lastEle = ele

  if (!ele) {
    return
  }

  // const currentHoveredBlockId = getBlockIdFromTarget(ele)
  // const currentHoveredBlockId = 'kxOzJNvGv'
  console.log('e.target:', e.target)
  // const temp = ele.closest('.rm-block__input')
  // console.log('close block input ele:', temp)
  const currentHoveredBlockId = getBlockIdFromHTMLEleId(ele.id)

  console.log('ele', ele, 'ele.id currentHoveredBlockId:', currentHoveredBlockId)
  window.sessionStorage.setItem('currentHoveredBlockId', currentHoveredBlockId)
  console.log('get item from session storage', window.sessionStorage.getItem('currentHoveredBlockId'))

  ReactDOM.render(menuTriger, root)
  root.style.position = 'fixed'
  root.style.top = ele.getBoundingClientRect().top + 4 + "px" // 4px padding
  root.style.right = window.innerWidth - ele.getBoundingClientRect().left + "px"

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