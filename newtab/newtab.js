'use strict';

let results = [];
let options = {
	shouldSort: true,
	threshold: 0.2,
	location: 0,
	distance: 1000,
	maxPatternLength: 64,
	minMatchCharLength: 1,
	keys: [
		"title",
		"keywords.data"
	]
};
let fuse;

class Newtab {
	constructor() {
		this.getResultsFromDb();
		$('input').keyup((e) => {
			let inputtext = $('.search-input').val();
			console.log('what the fuck');
			if ($(".search-input").val().length >= 1) {
				this.updateResults();
			} else {
				this.updateResults(8);
			}
		});
	}
	getResultsFromDb() {
		console.log('we are calling db why??');
		fetch( 'https://dv-hacks.glitch.me/', {
			method: 'GET'
		}).then(data => {
			return data.json()
		}).then(json=> {
			// Setting results!!
			results = json;
			this.updateResults(8);
			fuse = new Fuse(results, options);
		});
	}
	updateResults(limit = null) {
		$(".search-results").empty();
		let loopResults;
		if ($(".search-input").val().length >= 1) {
			loopResults = fuse.search($(".search-input").val());
		} else {
			loopResults = results;
		}
		loopResults.forEach((elem, index) => {
			if (limit) {
				if (index >= limit) {
					return false;
				}
			}
			let hasFaviconClass = elem.faviconurl == null ? 'no-favicon' : '';
			$('.search-results').append(`
				<li class="result" data-keywords="${elem.keywords}">
					<a href="${elem.url}" class="result-link">
						<img src="${elem.faviconurl}" alt="" class="favicon ${hasFaviconClass}">
						<span class="title">${elem.title}</span>
					</a>
				</li>`);
		});
	}
}

const giveBackReversed = (arr) => {
	let i = arr.length;
	let count = 0;
	let tmp = [];
	while (i--) {
		tmp[count] = arr[i];
		count++;
	}
	return tmp;
}

new Newtab();
