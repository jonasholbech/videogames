function get() {
  fetch("https://frontendspring21-b266.restdb.io/rest/videogames", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "60740773f592f7113340ef9a",
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    .then((data) => data.forEach(showGame));
}

function post() {
  const data = {
    title: "Minecraft",
    genre: "Blocky",
    age_limit: 7,
    developer: "Mojang",
    price: 149,
    description: "Build your own world",
    multiplayer: true,
    metascore: 89,
    release_date: Date.now(),
    platforms: ["XBOX", "Playstation 4", "Playstation 5", "PC", "Mac"],
  };

  const postData = JSON.stringify(data);
  fetch("https://frontendspring21-b266.restdb.io/rest/videogames", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "60740773f592f7113340ef9a",
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => showGame(data));
}

function deleteGame(id) {
  fetch("https://frontendspring21-b266.restdb.io/rest/videogames/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "60740773f592f7113340ef9a",
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
function showGame(game) {
  console.log(game);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h2").textContent = game.title;
  copy.querySelector("header p span").textContent = game.release_date;
  copy.querySelector(".metascore span").textContent = game.metascore;
  copy.querySelector(".age_limit span").textContent = game.age_limit;

  document.querySelector("main").appendChild(copy);
}
get();

document.querySelector(".addGame").addEventListener("click", post);
