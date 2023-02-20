import PowerlinkParser from './module/power-link-parser'
import PowerCssPack from './module/power-css-pack'
import PowerPreviewer from './module/power-previewer'
import blockMenu from './module/block-menu'
import chatgpt from './module/power-chatgpt'
import powerChatgpt from './module/power-chatgpt'

function onload() {
  PowerlinkParser.onload()
  PowerCssPack.onload()
  PowerPreviewer.onload()
  blockMenu.onload()
  chatgpt.onload()
}

function onunload() {
  PowerlinkParser.onunload()
  PowerCssPack.onunload()
  PowerPreviewer.onunload()
  blockMenu.onunload()
  powerChatgpt.onunload()
}

export default {
  onload: onload,
  onunload: onunload,
}
