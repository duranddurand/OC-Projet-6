const api_url = "http://127.0.0.1:8000/api/v1/titles/"



/* Fetch movies with parameters : genre, page, carouseldivid */

function fetchMovies(genre, page) {
    return fetch(`${api_url}?genre=${genre}&sort_by=-imdb_score&page=${page}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
}


document.body.onload = addElement;

function addElement () {
  // crée un nouvel élément div
  var newDiv = document.createElement("div");
  // et lui donne un peu de contenu
  var newContent = document.createTextNode(fetchMovies("", 1));
  // ajoute le nœud texte au nouveau div créé
  newDiv.appendChild(newContent);

  // ajoute le nouvel élément créé et son contenu dans le DOM
  var currentDiv = document.getElementById('div1');
  document.body.insertBefore(newDiv, currentDiv);
}