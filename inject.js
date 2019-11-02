window.saveLink = favicon => {
  console.log(`saving link:\n${window.location.href}`);

  let json = JSON.stringify({
    title: document.title,
    url: window.location.href,
    scrollPos: {
      x: window.scrollX,
      y: window.scrollY
    },
    savedBy: "",
    keywords: "",
    searchTerms: "",
    board: "",
    faviconurl: favicon
  });

  console.log(json);

  fetch("https://dv-hacks.glitch.me/save", {
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
