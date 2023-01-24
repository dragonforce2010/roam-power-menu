import linkTitleParser from './module/link-enchencer/link-title-parser'
import linkContentPreviewer from './module/link-enchencer/link-content-previewer'
// import blockToolBar from './module/block-tool-bar-deprected'
import "./module/css-enchencer"
import blockMenu from './module/block-menu'

function onload() {
  linkTitleParser.onload()
  linkContentPreviewer.onload()
  // blockToolBar.onload()
  blockMenu.onload()
}
  
function onunload() {
  linkTitleParser.onunload()
  linkContentPreviewer.onunload()
  // blockToolBar.onunload()
  blockMenu.onunload()
}

export default {
  onload: onload,
  onunload: onunload,
}
