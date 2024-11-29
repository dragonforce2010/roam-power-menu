import './styles/power-css.css'
import blockMenu from './block-menu'

function onload() {
  blockMenu.onload()
}

function onunload() {
  blockMenu.onunload()
}

export default {
  onload,
  onunload,
}
