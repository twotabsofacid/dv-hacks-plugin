const keywordExtractor = require("keyword-extractor");

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.addEventListener("load", event => {
  console.log("window loaded");
  let x = getParameterByName("scrollX");
  let y = getParameterByName("scrollY");
  window.scrollTo({
    top: y,
    left: x,
    behavior: "smooth"
  });
});

window.saveLink = async (favicon, theuser) => {
  console.log(`saving link:\n${window.location.href}`);
  let keywordExtractorRaw = keywordExtractor.extract(
    document.getElementsByTagName("body")[0].innerText,
    {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false
    }
  );
  let keywords = keywordExtractorRaw.filter(
    (a, i, aa) => aa.indexOf(a) === i && aa.lastIndexOf(a) !== i
  );
  keywords = keywords.join(", ");
  let json = JSON.stringify({
    title: document.title,
    url: window.location.href,
    scrollPos: {
      x: window.scrollX,
      y: window.scrollY
    },
    savedBy: theuser,
    keywords: keywords,
    searchTerms: "",
    board: "",
    faviconurl: favicon
  });

  console.log(json);

  await fetch("https://dv-hacks.glitch.me/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: json
  })
    .then(res => {
      res.json();
    })
    .then(newjson => {
      console.log(newjson);
    });
};
