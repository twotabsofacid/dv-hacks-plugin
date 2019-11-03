const savedStatus = document.getElementById("save_status");

const notSaved = `<div class="section flex">
This page is not saved.
<button id="add-button" class="add-button">Add +</button>
</div>`;

const saved = `<div class="section flex">
This page has been saved
<span>&#x2713;</span>
</div>`;

document.addEventListener("click", event => {
  let buttonClicked = event.target.classList.contains("add-button");

  // if click occurs on our add-button button
  if (buttonClicked) {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.identity.getProfileUserInfo(function(userInfo) {
        let user = userInfo.email.toString() || "none";
        let icon = tab.favIconUrl.toString();
        chrome.tabs.executeScript(tab.tabId, {
          code: `saveLink("${icon}", "${user}");`
        });
        savedStatus.innerHTML = saved;
      });
    });
  }
});

window.onload = () => {
  chrome.tabs.getSelected(null, async function(tab) {
    let api = "https://dv-hacks.glitch.me/find?url=";
    let query = api + tab.url;
    await fetch(query, {
      method: "GET"
    })
      .then(data => data.json())
      .then(json => {
        console.log(json);
        if (json.length > 0) {
          savedStatus.innerHTML = saved;
        } else {
          savedStatus.innerHTML = notSaved;
        }
      });
  });
};
