const keywordExtractor = require("keyword-extractor");

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
