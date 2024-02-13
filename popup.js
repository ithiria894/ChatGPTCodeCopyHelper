chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "countElements" }, function (response) {
      if (response && response.count !== undefined) {
        document.getElementById("count").textContent = "Found " + response.count + " elements";
      } else {
        // document.getElementById("count").textContent = "Error: Could not retrieve element count";
      }
    });
  });
  