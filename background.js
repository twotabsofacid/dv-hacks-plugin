'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.executeScript(null, {file: "savetab.js"});
});

class Background {
	constructor() {
		console.log('Is this even used?');
	}
}

new Background();
