import React, { useCallback } from 'react'

interface FormatSubmenuProps {
  onClose: () => void;
}

export function FormatSubmenu({ onClose }: FormatSubmenuProps) {
  const handleFormatClick = useCallback((tag: string) => {
    // 现有代码...
  }, []);

  const handleClearFormat = useCallback(() => {
    const uid = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
    if (!uid) return;
    
    // 获取当前块的所有标签
    const tags = window.roamAlphaAPI.q(`
      [:find ?tags .
       :where [?b :block/uid "${uid}"]
              [?b :block/refs ?r]
              [?r :node/title ?tags]]`);
    
    // 过滤出所有 css 相关的标签
    const cssTags = tags?.filter((tag: string) => tag.startsWith('css-')) || [];
    
    // 移除所有 css 标签
    cssTags.forEach((tag: string) => {
      window.roamAlphaAPI.data.block.removeTag({
        block: { uid },
        tag: tag,
      });
    });
    
    onClose();
  }, [onClose]);

  return (
    <div className="format-submenu">
      {/* 在最上方添加清除样式选项 */}
      <div 
        className="menu-item"
        onClick={handleClearFormat}
      >
        <span>清除所有样式</span>
      </div>
      <div className="menu-divider" />
      
      {/* 现有的样式选项... */}
      <div className="format-group">
        <h3>背景色</h3>
        <div 
          className="menu-item" 
          onClick={() => handleFormatClick("css-bg-orange-100")}
        >
          <span>浅橙色背景</span>
        </div>
        {/* 其他现有选项... */}
      </div>
      {/* 其他格式组... */}
    </div>
  );
}

export default FormatSubmenu