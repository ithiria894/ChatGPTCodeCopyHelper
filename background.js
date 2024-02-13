chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "scrollToTop") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrollToTop" });
      });
    }
  });
  