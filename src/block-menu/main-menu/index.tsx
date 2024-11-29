import React, { useState } from 'react'
import { Classes, Icon, Menu, MenuDivider, MenuItem, NumericInput, Popover, Position } from '@blueprintjs/core'
import { appendTextToBlock } from '../../roam-sdk/roam'
import '../../styles/power-css.css'

interface StyleOption {
  label: string
  tag: string
  icon?: string
}

const COLORS: StyleOption[] = [
  { label: 'Navy', tag: 'navy' },
  { label: 'Blue', tag: 'blue' },
  { label: 'Aqua', tag: 'aqua' },
  { label: 'Teal', tag: 'teal' },
  { label: 'Olive', tag: 'olive' },
  { label: 'Green', tag: 'green' },
  { label: 'Orange', tag: 'orange' },
  { label: 'Purple', tag: 'purple' },
  { label: 'Maroon', tag: 'maroon' },
  { label: 'Red', tag: 'red' },
  { label: 'Pink', tag: 'pink' },
  { label: 'Coral', tag: 'coral' },
  { label: 'Brown', tag: 'brown' },
  { label: 'Gray', tag: 'gray' },
  { label: 'Black', tag: 'black' },
  { label: 'Indigo', tag: 'indigo' },
  { label: 'Violet', tag: 'violet' },
  { label: 'Crimson', tag: 'crimson' },
  { label: 'Gold', tag: 'gold' },
]

const FONT_FAMILIES: StyleOption[] = [
  { label: 'Serif', tag: 'serif' },
  { label: 'Sans Serif', tag: 'sans-serif' },
  { label: 'Monospace', tag: 'monospace' },
  { label: 'Cursive', tag: 'cursive' },
  { label: 'Fantasy', tag: 'fantasy' },
  { label: 'Arial', tag: 'arial' },
  { label: 'Times New Roman', tag: 'times-new-roman' },
  { label: 'Courier New', tag: 'courier-new' },
  { label: 'Georgia', tag: 'georgia' },
  { label: 'Verdana', tag: 'verdana' },
  { label: 'Helvetica', tag: 'helvetica' },
  { label: 'Palatino', tag: 'palatino' },
  { label: 'Garamond', tag: 'garamond' },
  { label: 'Bookman', tag: 'bookman' },
  { label: 'Comic Sans MS', tag: 'comic-sans' },
]

const FONT_SIZES: StyleOption[] = [
  { label: '12px', tag: '12px' },
  { label: '14px', tag: '14px' },
  { label: '16px', tag: '16px' },
  { label: '18px', tag: '18px' },
  { label: '20px', tag: '20px' },
  { label: '24px', tag: '24px' },
  { label: '28px', tag: '28px' },
  { label: '32px', tag: '32px' },
  { label: '36px', tag: '36px' },
  { label: '40px', tag: '40px' },
  { label: '48px', tag: '48px' },
  { label: 'Small', tag: 'small' },
  { label: 'Medium', tag: 'medium' },
  { label: 'Large', tag: 'large' },
  { label: 'X-Large', tag: 'x-large' },
  { label: 'XX-Large', tag: 'xx-large' },
]

const BORDERS: StyleOption[] = [
  { label: 'Solid Border', tag: 'border-1' },
  { label: 'Dashed Border', tag: 'border-2' },
  { label: 'Double Border', tag: 'border-3' },
]

const clearAllStyles = async () => {
  const blockId = window.sessionStorage.getItem('currentHoveredBlockId')
  console.log('Current block ID:', blockId)
  if (!blockId) return

  const clearStylesForBlock = async (uid: string) => {
    // 1. 获取当前块的内容
    const blockInfo = window.roamAlphaAPI.pull(
      '[*]',
      `[:block/uid "${uid}"]`
    )
    
    if (!blockInfo || !blockInfo[':block/string']) return
    // 2. 获取当前文本内容并移除所有 CSS 标签
    const currentText = blockInfo[':block/string']
    const newText = currentText.replace(/#\.css-[^\s]+/g, '').trim()
    
    // 3. 更新块的内容
    await window.roamAlphaAPI.data.block.update({
      block: {
        uid: uid,
        string: newText
      }
    })

    // 4. 获取子块
    const children = window.roamAlphaAPI.q(`
      [:find [?child_uid ...]
       :where 
        [?b :block/uid "${uid}"]
        [?b :block/children ?c]
        [?c :block/uid ?child_uid]]
    `) as string[]

    // 5. 递归处理子块
    if (children && Array.isArray(children)) {
      for (const childUid of children) {
        await clearStylesForBlock(childUid)
      }
    }
  }

  try {
    await clearStylesForBlock(blockId)
    console.log('Successfully cleared all styles')
  } catch (error) {
    console.error('Error clearing styles:', error)
  }
}

// 添加清除单个块样式的函数
const clearCurrentBlockStyles = async () => {
  const blockId = window.sessionStorage.getItem('currentHoveredBlockId')
  console.log('Current block ID:', blockId)
  if (!blockId) return

  try {
    // 1. 获取当前块的内容
    const blockInfo = window.roamAlphaAPI.pull(
      '[*]',
      `[:block/uid "${blockId}"]`
    )
    
    if (!blockInfo || !blockInfo[':block/string']) return
    
    // 2. 获取当前文本内容并移除所有 CSS 标签
    const currentText = blockInfo[':block/string']
    const newText = currentText.replace(/#\.css-[^\s]+/g, '').trim()
    
    // 3. 更新块的内容
    await window.roamAlphaAPI.data.block.update({
      block: {
        uid: blockId,
        string: newText
      }
    })
    
    console.log('Successfully cleared current block styles')
  } catch (error) {
    console.error('Error clearing current block styles:', error)
  }
}

const CustomFontSizeInput: React.FC<{ onApply: (size: number) => void }> = ({ onApply }) => {
  const [fontSize, setFontSize] = useState<number>(16)

  return (
    <div style={{ padding: '10px' }}>
      <NumericInput
        min={1}
        max={200}
        value={fontSize}
        onValueChange={(value) => setFontSize(value)}
        placeholder="Enter font size"
        style={{ width: '100px' }}
      />
      <button
        className={Classes.BUTTON}
        onClick={() => onApply(fontSize)}
        style={{ marginLeft: '5px' }}
      >
        Apply
      </button>
    </div>
  )
}

const MainMenu: React.FC = () => {
  const applyStyle = (styleType: string, value: string) => {
    const blockId = window.sessionStorage.getItem('currentHoveredBlockId')
    if (!blockId) return
    appendTextToBlock(blockId, ` #.css-${styleType}-${value}`)
  }

  const handleCustomFontSize = (size: number) => {
    applyStyle('font', `${size}px`)
  }

  return (
    <div className='main-menu'>
      <Menu className={Classes.ELEVATION_1}>
        <MenuItem
          icon="clean"
          text="Clear Current Block Style"
          onClick={clearCurrentBlockStyles}
          intent="warning"
        />
        <MenuItem
          icon="trash"
          text="Clear All Styles (Including Children)"
          onClick={clearAllStyles}
          intent="danger"
        />
        <MenuDivider />

        {/* 层级样式 */}
        <MenuItem icon="layers" text="Level Styles">
          <MenuItem 
            icon="tint"
            text="Level Background"
            onClick={() => applyStyle('level', 'bg')}
          />
          <MenuItem 
            icon="font"
            text="Level Font Color"
            onClick={() => applyStyle('level', 'color')}
          />
        </MenuItem>

        {/* 背景色菜单 */}
        <MenuItem icon="style" text="Background Color">
          {COLORS.map(color => (
            <MenuItem 
              key={color.tag}
              icon="tint"
              text={color.label}
            >
              <MenuItem 
                text="Light" 
                onClick={() => applyStyle('bg', `${color.tag}-100`)} 
              />
              <MenuItem 
                text="Medium" 
                onClick={() => applyStyle('bg', `${color.tag}-300`)} 
              />
              <MenuItem 
                text="Dark" 
                onClick={() => applyStyle('bg', `${color.tag}-500`)} 
              />
            </MenuItem>
          ))}
        </MenuItem>

        {/* 字体样式菜单 */}
        <MenuItem icon="font" text="Font Styles">
          <MenuItem icon="font" text="Font Color">
            {COLORS.map(color => (
              <MenuItem 
                key={color.tag}
                text={color.label}
                onClick={() => applyStyle('font', color.tag)}
              />
            ))}
          </MenuItem>
          
          <MenuItem icon="font" text="Font Family">
            {FONT_FAMILIES.map(family => (
              <MenuItem 
                key={family.tag}
                text={family.label}
                onClick={() => applyStyle('font-family', family.tag)}
              />
            ))}
          </MenuItem>

          <MenuItem icon="text-highlight" text="Font Size">
            {/* 预设字体大小 */}
            {FONT_SIZES.map(size => (
              <MenuItem 
                key={size.tag}
                text={size.label}
                onClick={() => applyStyle('font', size.tag)}
              />
            ))}
            <MenuDivider />
            {/* 自定义字体大小 */}
            <Popover
              content={<CustomFontSizeInput onApply={handleCustomFontSize} />}
              position={Position.RIGHT}
              minimal={true}
            >
              <MenuItem 
                icon="numerical"
                text="Custom Size..."
              />
            </Popover>
          </MenuItem>
        </MenuItem>

        {/* 边框样式 */}
        <MenuItem icon="square" text="Borders">
          {BORDERS.map(border => (
            <MenuItem 
              key={border.tag}
              text={border.label}
              onClick={() => applyStyle('border', border.tag)}
            />
          ))}
        </MenuItem>

        {/* 盒子样式 */}
        <MenuItem icon="box" text="Box Styles">
          {COLORS.map(color => (
            <MenuItem 
              key={color.tag}
              text={color.label}
            >
              <MenuItem 
                text="Left Aligned"
                onClick={() => applyStyle('box', `${color.tag}-left`)}
              />
              <MenuItem 
                text="Center Aligned"
                onClick={() => applyStyle('box', `${color.tag}-center`)}
              />
              <MenuItem 
                text="Right Aligned"
                onClick={() => applyStyle('box', `${color.tag}-right`)}
              />
            </MenuItem>
          ))}
        </MenuItem>

        {/* 布局菜单 */}
        <MenuItem icon="layout" text="Layout">
          <MenuItem icon="grid" text="Fixed Columns">
            <MenuItem 
              text="Two Columns" 
              onClick={() => applyStyle('grid', '2')}
            />
            <MenuItem 
              text="Three Columns" 
              onClick={() => applyStyle('grid', '3')}
            />
            <MenuItem 
              text="Four Columns" 
              onClick={() => applyStyle('grid', '4')}
            />
            <MenuItem 
              text="Five Columns" 
              onClick={() => applyStyle('grid', '5')}
            />
            <MenuItem 
              text="Six Columns" 
              onClick={() => applyStyle('grid', '6')}
            />
          </MenuItem>
          
          <MenuItem icon="grid" text="Auto Fill">
            {[100, 200, 300, 400, 500].map(width => (
              <MenuItem 
                key={width}
                text={`${width}px Columns`}
                onClick={() => applyStyle('grid-auto', width.toString())}
              />
            ))}
          </MenuItem>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MainMenu