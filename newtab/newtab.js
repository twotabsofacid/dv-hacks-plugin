'use strict';

class Newtab {
	constructor() {
		console.log('we are here bitch!!!');
		chrome.storage.sync.get(['dvhacks'], function(result) {
			console.log(result);
		});
	}
}

new Newtab();
