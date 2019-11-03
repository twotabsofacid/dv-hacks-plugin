"use strict";

let results = [];
let options = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 1000,
  maxPatternLength: 64,
  minMatchCharLength: 1,
  keys: ["title", "keywords.data"]
};
let fuse;

class Newtab {
  constructor() {
    this.getResultsFromDb();
    $("input").keyup(e => {
      let inputtext = $(".search-input").val();
      this.updateResults();
      if ($(".search-input").val().length >= 1) {
        this.updateResults();
      } else {
        this.updateResults(8);
      }
    });
  }
  getResultsFromDb() {
    fetch("https://dv-hacks.glitch.me/", {
      method: "GET"
    })
      .then(data => {
        return data.json();
      })
      .then(json => {
        // Setting results!!
        results = json;
        // console.log(json);
        this.updateResults(100);
        fuse = new Fuse(results, options);
      });
  }
  updateResults(limit = null) {
    $(".search-results").empty();
    // let reverseResults;
    let searchResults;
    if ($(".search-input").val().length >= 1) {
      // reverseResults = giveBackReversed(fuse.search($(".search-input").val()));
      searchResults = fuse.search($(".search-input").val());
    } else {
      searchResults = results;
    }
    searchResults.forEach((elem, index) => {
      if (limit) {
        if (index >= limit) {
          return false;
        }
      }
      let hasFaviconClass = elem.faviconurl == null ? "no-favicon" : "";
      let scrollParam =
        "?" +
        ((elem.scrollPos.x ? "scrollX=" + elem.scrollPos.x + " " : "") +
          (elem.scrollPos.y ? "scrollY=" + elem.scrollPos.y : "")
            .split(" ")
            .join("&"));

      let linkURL = $(".search-results").append(`
				<li class="result" data-keywords="${elem.keywords.data.join(", ")}">
          <a href="${elem.url}${
        scrollParam.length > 1 ? scrollParam : ""
      }" class="result-link">
          <div>
						<img src="${elem.faviconurl}" alt="" class="favicon ${hasFaviconClass}">
						<span class="title">${
              elem.title.length > 40
                ? elem.title.slice(0, 40) + "..."
                : elem.title
            }</span>
            </div>
            <div class="lower">
            <span class="user">${elem.savedBy.split("@")[0]}</span>
            <span class="date">${new Date(elem.created_at).toLocaleDateString(
              "en-US"
            )}</span>
            </div>
					</a>
				</li>`);
    });
  }
}

// const giveBackReversed = arr => {
//   let i = arr.length;
//   let count = 0;
//   let tmp = [];
//   while (i--) {
//     tmp[count] = arr[i];
//     count++;
//   }
//   return tmp;
// };

new Newtab();
