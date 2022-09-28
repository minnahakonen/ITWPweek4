import "./styles.css";

const searchArea = document.getElementById("input-show");
const searchButton = document.getElementById("submit-data");

searchButton.addEventListener("click", getTVShows);

async function getTVShows() {
  const searchValue = document.getElementById("input-show").value;
  const url =
    "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(searchValue);
  const searchPromise = await fetch(url);
  const tvshowJSON = await searchPromise.json();

  //console.log(tvshowJSON);

  //const title = tvshowJSON.show.name
  //console.log(title)
  const tvViewer = document.getElementById("tv-viewer");

  tvshowJSON.forEach((item) => {
    let showImgDiv = document.createElement("div");
    showImgDiv.className = "show-data";
    let showTitleDiv = document.createElement("div");
    showTitleDiv.className = "show-info";
    let newImg = document.createElement("img");
    let newTitle = document.createElement("h1");
    let newP = document.createElement("p");
    let title = item.show.name;
    let newSrc;
    if (item.show.image !== null) {
      newSrc = item.show.image.medium;
      //console.log("not null");
    } else {
      newSrc = "";
      //console.log("null");
    }
    newImg.src = newSrc;
    let summary = item.show.summary;
    //console.log(summary);
    let text;
    if (summary !== null) {
      text = summary.replace(/(<([^>]+)>)/gi, "");
    } else {
      text = "";
    }
    //reference for stripping tags: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
    //console.log(typeof summary);
    newImg.append(newSrc);
    newTitle.append(title);
    newP.append(text);

    //newImg.append(img);
    showImgDiv.append(newImg);
    showTitleDiv.append(newTitle);
    showTitleDiv.append(newP);
    showImgDiv.append(showTitleDiv);
    tvViewer.append(showImgDiv);
  });
}
