import React from 'react'
import ReactDOM from 'react-dom' 
import BlockToolBar from './block-tool-bar';
import "./index.css"

let lastEle: HTMLElement;
let lastRoot: HTMLElement;
const onMouseEnter = (e: MouseEvent) => {
  const ele = (e.target as HTMLElement).closest('.rm-block')

  let root = document.createElement('div')
  root.className = 'block-tool-bar'
  
  if (lastEle === ele) return

  if (lastRoot) {
    lastRoot.remove()
  }

  
  lastRoot = root
  lastEle = ele as HTMLElement
  
  if (!ele) {
    return
  }


  ReactDOM.render(React.createElement(BlockToolBar), root)
  
  root.style.position = 'fixed';
  root.style.top = ele.getBoundingClientRect().top - 30 + 'px';
  root.style.left = ele.getBoundingClientRect().left + 'px';
  // root.style.background = 'orange'
  
  document.body.appendChild(root);
  // console.log('mouse enter:', e)
}

function onload() {
  document.querySelector('.roam-article').addEventListener('mouseenter', onMouseEnter, true)
}
  
function onunload() {
  document.querySelector('.roam-article').removeEventListener('mouseenter', onMouseEnter, true)
}

export default {
  onload: onload,
  onunload: onunload,
}