import './styles/power-css.css'
import blockMenu from './block-menu'

function onload() {
  // PowerlinkParser.onload()
  blockMenu.onload()
}

function onunload() {
  blockMenu.onunload()
}

export default {
  onload: onload,
  onunload: onunload,
}
