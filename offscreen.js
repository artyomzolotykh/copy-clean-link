chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (
    message.target !== 'offscreen'
    || message.type !== 'copy-to-clipboard'
  ) {
    return
  }

  try {
    const textarea = document.querySelector('#clipboard')
    textarea.value = message.text
    textarea.select()

    const copied = document.execCommand('copy')
    textarea.value = ''

    if (!copied) {
      throw new Error('The browser rejected the clipboard operation')
    }

    sendResponse({ ok: true })
  } catch (error) {
    sendResponse({
      ok: false,
      error: error instanceof Error
        ? error.message
        : 'Unable to access the clipboard'
    })
  }
})
