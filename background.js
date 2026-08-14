import { cleanUrl } from './url-cleaner.js'

const offscreenDocumentPath = 'offscreen.html'
let creatingOffscreenDocument

const hasOffscreenDocument = async () => {
  const offscreenUrl = chrome.runtime.getURL(offscreenDocumentPath)

  if ('getContexts' in chrome.runtime) {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: [offscreenUrl]
    })

    return contexts.length > 0
  }

  const clientsList = await clients.matchAll()
  return clientsList.some((client) => client.url === offscreenUrl)
}

const ensureOffscreenDocument = async () => {
  if (await hasOffscreenDocument()) {
    return
  }

  if (!creatingOffscreenDocument) {
    creatingOffscreenDocument = chrome.offscreen.createDocument({
      url: offscreenDocumentPath,
      reasons: ['CLIPBOARD'],
      justification: 'Copy a cleaned link to the clipboard'
    }).finally(() => {
      creatingOffscreenDocument = undefined
    })
  }

  await creatingOffscreenDocument
}

const copyToClipboard = async (text) => {
  await ensureOffscreenDocument()

  const response = await chrome.runtime.sendMessage({
    target: 'offscreen',
    type: 'copy-to-clipboard',
    text
  })

  if (!response?.ok) {
    throw new Error(response?.error || 'Unable to copy URL')
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copy-clean-link',
    title: 'Copy Clean Link',
    contexts: ['link']
  })
})

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== 'copy-clean-link' || !info.linkUrl) {
    return
  }

  try {
    const result = cleanUrl(info.linkUrl)
    await copyToClipboard(result.url)
  } catch (error) {
    console.error('Unable to copy clean link:', error)
  }
})
