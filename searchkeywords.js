'use strict';

class SearchKeywords {
	constructor() {
		let searchTerms = $('input:not([type="hidden"])')[0].value;
		console.log(searchTerms);
	}
}

new searchKeywords();
