import "./style.css";
import axios from "axios";
import getData from "./getdata";

const apiEndpoint = "https://openlibrary.org/search.json?q=";
document.querySelector("#app").innerHTML = `
  <div>
  <form id="bookform">
   <label for="bookinput">Søk etter bøker her(topp 10 resultater):</label>
   <input id ="bookinput" type="text">
   <button id="submit" type="submit">Søk</button>
   </form>
   <div id="results"></div>
   <button id="nxt"><a href="#bookform">Neste side</a></button>
  </div>
`;

// variables for the eventlisteners on Submit search and next page
let nrTenPlus = 10;
let nxtTenPlus = 20;
const bookForm = document.getElementById("bookform");
let inputBook = document.getElementById("bookinput");
const results = document.getElementById("results");
const nxtBtn = document.getElementById("nxt");
nxtBtn.classList.add("hidden");
// Eventlistener for submit search
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const bookData = await getData(
      apiEndpoint + encodeURIComponent(inputBook.value)
    );
    // only get top ten of the search results
    const topTen = (bookData.docs || []).slice(0, 10);
    console.log(topTen);
    applyData(topTen);
    nxtBtn.classList.remove("hidden");
    // Event listener for next page
    nxtBtn.addEventListener("click", () => {
      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }
      let nxtTen = (bookData.docs || []).slice(nrTenPlus, nxtTenPlus);
      applyData(nxtTen);
      nrTenPlus += 10;
      nxtTenPlus += 10;
    });
  } catch (error) {
    console.error(error);
    results.textContent = "Noe gikk galt";
  }
});

// function to apply header and paragraphs to each title and author name on the search results
function applyData(data) {
  for (let i = 0; i < data.length; i++) {
    const p = document.createElement("p");
    const h = document.createElement("h2");
    const bookImg = document.createElement("img");
    const coverId = data[i].cover_i;
    const imgUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    bookImg.src = imgUrl;
    h.textContent = data[i].author_name;
    p.textContent = data[i].title;
    results.append(h, p, bookImg);
  }
}
