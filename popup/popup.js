const button = document.getElementById("add-button");

button.addEventListener("click", () => {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.executeScript(tab.tabId, {
      code: "saveLink('" + tab.favIconUrl.toString() + "');"
    });
  });
});
