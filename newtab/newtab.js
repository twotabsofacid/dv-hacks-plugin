'use strict';

let results = [];
let options = {
	shouldSort: true,
	threshold: 0.4,
	location: 0,
	distance: 100,
	maxPatternLength: 64,
	minMatchCharLength: 1,
	keys: [
		"title"
	]
};
let fuse;

class Newtab {
	constructor() {
		this.getResultsFromDb();
		$('input').keyup((e) => {
			let inputtext = $('.search-input').val();
			this.updateResults(fuse.search(inputtext));
		});
	}
	getResultsFromDb() {
		fetch( 'https://dv-hacks.glitch.me/', {
			method: 'GET'
		}).then(data => {
			return data.json()
		}).then(json=> {
			let results = json;
			this.updateResults(results, 8);
			fuse = new Fuse(results, options);
		});
	}
	updateResults(results, limit = null) {
		$(".search-results").empty();
		if (results.length) {
			results.forEach((elem, index) => {
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
		} else if ($(".search-input").val().length == 0) {
			this.getResultsFromDb();
		}
	}
}

new Newtab();
