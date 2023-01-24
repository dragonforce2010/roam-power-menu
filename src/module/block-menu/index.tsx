import React from 'react'
import "./index.css"
import ReactDOM from 'react-dom'
import BlockMenuTrigger from './menu-trigger'

let lastEle: HTMLElement
let lastRoot: HTMLElement
let menuTriger = React.createElement(BlockMenuTrigger)

const onMouseEnter = (e: MouseEvent) => {
  let targetEle = (e.target as HTMLElement) 
  if (targetEle.classList.contains('.rm-block')) return 

  // const ele = (e.target as HTMLElement).closest('.rm-block')

  let root = document.createElement('div')

  if (lastRoot) {
    lastRoot.remove()
  }

  lastRoot = root
  lastEle = targetEle

  if (!targetEle) {
    return
  }

  ReactDOM.render(menuTriger, root)
  root.style.position = 'fixed'
  root.style.top = targetEle.getBoundingClientRect().top + 4 + "px" // 4px padding
  root.style.left = targetEle.getBoundingClientRect().left - 20 + "px"

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