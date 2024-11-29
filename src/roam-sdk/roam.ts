export function getFocusedBlockUid() {
  return window.roamAlphaAPI.ui.getFocusedBlock()?.['block-uid']
}

export function getBlockContent(uid: string) {
  return (window.roamAlphaAPI.q(`[:find (pull ?page [:block/string])
                      :where [?page :block/uid "${uid}"]  ]`)[0][0] as { string: string }).string;
}

export function updateBlockContent(uid: string, newContent: string) {
  window.roamAlphaAPI.updateBlock({
    block: {
      uid: uid,
      string: newContent
    }
  })
}

export function appendTextToBlock(uid: string, appendedText: string) {
  const originContent = getBlockContent(uid)
  const newContent = originContent + appendedText
  updateBlockContent(uid, newContent)
}

export function appendTextToFocusedBlock(appendedText: string) {
  const uid = getFocusedBlockUid()
  console.log('focused block uid', uid)
  const originContent = getBlockContent(uid)
  const newContent = originContent + appendedText
  updateBlockContent(uid, newContent)
}

export const getAllBlockUids = () =>
  window.roamAlphaAPI
    .q(`[:find ?u :where [?e :block/uid ?u] [?e :block/string]]`)
    .map((f: any) => f[0] as string);


export const getBlockIdFromHTMLEleId = (id: string): string => {
  const blockUid = id.substring(id.length - 9, id.length);
  return blockUid
}

export const waitForRoamLoad = () => {
  return new Promise<void>((resolve) => {
    if (window.roamAlphaAPI) {
      resolve();
      return;
    }
    
    const observer = new MutationObserver((mutations) => {
      if (window.roamAlphaAPI) {
        observer.disconnect();
        resolve();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export const onRouteChange = (f: (path: string) => void) => {
  // 已有代码...
};
