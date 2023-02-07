import PowerlinkParser from './module/power-link-parser'
import linkContentPreviewer from './module/link-content-previewer'
import PowerCssPack from './module/power-css-pack'
import blockMenu from './module/block-menu'

function onload() {
  PowerlinkParser.onload()
  PowerCssPack.onload()
  linkContentPreviewer.onload()
  blockMenu.onload()
}

function onunload() {
  PowerlinkParser.onunload()
  PowerCssPack.onunload()
  linkContentPreviewer.onunload()
  blockMenu.onunload()
}

export default {
  onload: onload,
  onunload: onunload,
}
