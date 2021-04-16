import { autoExpandTextarea } from "./helpers.js";
import { headers } from "./settings.js";
autoExpandTextarea();

function get() {
  fetch("https://frontendspring21-b266.restdb.io/rest/videogames", {
    method: "get",
    headers: headers,
  })
    .then((e) => e.json())
    .then((data) => data.forEach(showGame));
}

function post(data) {
  const postData = JSON.stringify(data);
  fetch("https://frontendspring21-b266.restdb.io/rest/videogames", {
    method: "post",
    headers: headers,
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => showGame(data));
}

function deleteGame(id) {
  fetch("https://frontendspring21-b266.restdb.io/rest/videogames/" + id, {
    method: "delete",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
function showGame(game) {
  console.log(game);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h2").textContent = game.title;
  copy.querySelector(".release-date").textContent = game.release_date;
  copy.querySelector(".metascore span").textContent = game.metascore;
  copy
    .querySelector(".metascore")
    .style.setProperty("--metascore", game.metascore);
  copy.querySelector(".age_limit span").textContent = game.age_limit;

  document.querySelector(".games").appendChild(copy);
}
get();

//document.querySelector(".addGame").addEventListener("click", post);
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.elements.title.checkValidity()) {
    form.elements.title.nextElementSibling.removeAttribute("hidden");
    form.elements.title.focus();
  }

  if (form.checkValidity()) {
    let multiplayer = true;
    if (form.elements.game_mode.value === "singleplayer") {
      multiplayer = false;
    }
    const platforms = [];
    const platformEls = document.querySelectorAll("[name=platform]:checked");
    platformEls.forEach((el) => platforms.push(el.value));

    console.log(platforms);
    post({
      title: form.elements.title.value,
      genre: form.elements.genre.value,
      age_limit: form.elements.age_limit.value,
      developer: "Epic Games",
      price: form.elements.price.value,
      description: form.elements.description.value,
      multiplayer: multiplayer,
      metascore: form.elements.metascore.value,
      release_date: Date.now(),
      platforms: platforms,
    });
  }
});
document.querySelector("form").setAttribute("novalidate", true);
