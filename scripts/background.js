chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  const tabId = sender.tab.id;

  if (request.localstorage == "isAllowed") {
    chrome.storage.local.get([request.localstorage]).then(function (result) {
      chrome.tabs.sendMessage(tabId, { message: 'allowed', selected: result.isAllowed ? true : false });
    });
  }
});