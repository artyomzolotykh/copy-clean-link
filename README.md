# Copy Clean Link

A simple Chrome extension that removes all query parameters from a URL and copies the clean version.

## Features

* Remove all query parameters from the current URL
* Preserve the URL path and hash
* Copy the cleaned URL with one click
* Copy clean links directly from the context menu
* See which parameters were removed
* No accounts
* No external services

## Example

Original URL:

```text
https://example.com/product?id=123&utm_source=google#reviews
```

Clean URL:

```text
https://example.com/product#reviews
```

Copy Clean Link removes everything after `?` while keeping the URL path and hash.

## Installation

### Local installation

1. Download or clone this repository.
2. Open Chrome and go to:

```text
chrome://extensions
```

3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the project folder.
6. Pin **Copy Clean Link** to the browser toolbar.

## How to use

### Current page

Open any page and click the **Copy Clean Link** extension icon.

The extension will show the cleaned URL and the parameters that were removed.

Click **Copy Clean URL** to copy it to the clipboard.

### Context menu

Right-click a link on a webpage and select:

```text
Copy Clean Link
```

The cleaned version of the link will be copied directly to your clipboard.

## Important

Query parameters can sometimes be required for a page to work correctly.

Copy Clean Link intentionally removes **all** query parameters. Use the cleaned URL when you want the base version of a link without anything after `?`.

## Privacy

Copy Clean Link works locally in your browser.

The extension does not send URLs to an external server and does not require an account.

## License

License information will be added later.
