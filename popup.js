import { cleanUrl } from './url-cleaner.js'

const showRemovedParameters = (parameters) => {
  const removedSection = document.querySelector('#removed-section')
  const removedList = document.querySelector('#removed-list')
  const removedCount = document.querySelector('#removed-count')

  removedList.innerHTML = ''

  if (parameters.length === 0) {
    removedSection.hidden = true
    removedCount.textContent = ''
    return
  }

  removedSection.hidden = false
  removedCount.textContent = `${parameters.length} parameters removed`

  for (const parameter of parameters) {
    const item = document.createElement('li')
    item.textContent = parameter
    removedList.append(item)
  }
}

const initializePopup = async () => {
  const textarea = document.querySelector('#clean-url')
  const copyButton = document.querySelector('#copy-button')
  const copyIcon = document.querySelector('#copy-icon')
  const checkIcon = document.querySelector('#check-icon')
  const copyText = document.querySelector('#copy-text')
  const status = document.querySelector('#status')
  const urlLabel = document.querySelector('#url-label')

  try {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    if (!activeTab?.url) {
      throw new Error('Unable to read current page URL')
    }

    const result = cleanUrl(activeTab.url)
    const hasRemovedParameters = result.removedParameters.length > 0
    const defaultButtonText = hasRemovedParameters
      ? 'Copy Clean URL'
      : 'Copy Original URL'

    textarea.value = result.url
    copyText.textContent = defaultButtonText

    showRemovedParameters(result.removedParameters)

    if (!hasRemovedParameters) {
      urlLabel.textContent = 'Original URL'
      status.textContent = 'No URL parameters found'
    }

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(result.url)

        copyButton.classList.add('is-copied')
        copyIcon.classList.add('is-hidden')
        checkIcon.classList.remove('is-hidden')
        copyText.textContent = 'Copied'
        status.textContent = 'URL copied to clipboard'

        window.setTimeout(() => {
          copyButton.classList.remove('is-copied')
          copyIcon.classList.remove('is-hidden')
          checkIcon.classList.add('is-hidden')
          copyText.textContent = defaultButtonText
        }, 1200)
      } catch {
        status.textContent = 'Unable to copy this URL'
      }
    })
  } catch (error) {
    textarea.value = ''
    copyButton.disabled = true
    copyIcon.classList.add('is-hidden')
    checkIcon.classList.add('is-hidden')
    copyText.textContent = 'Unavailable'

    status.textContent = error instanceof Error
      ? error.message
      : 'Unable to process this URL'
  }
}

initializePopup()
