'use strict';

// So if you have any variables or whatever it gets fucked up :(
// console.log('we are saving this mother fucker!!!');
let saveObj = {
	"title": document.title,
	"url": document.URL,
	"scrollX": window.scrollX,
	"scrollY": window.scrollY,
	"savedBy": "cool_user_420",
	"date": new Date(),
	"keywords": []
}

chrome.storage.sync.get(['dvhacks'], function(result) {
	if (result.dvhacks != undefined) {
		// add the new save obj to an array
		result.dvhacks.push(saveObj);
		chrome.storage.sync.set({'dvhacks': result.dvhacks}, function() {
			console.log('we got something!');
			console.log(result.dvhacks);
		})
	} else {
		chrome.storage.sync.set({'dvhacks': [saveObj]}, function() {
			console.log('we got nothing!');
			console.log(saveObj);
        });
	}
});
