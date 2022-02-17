const api_url = "http://localhost:8000/api/v1/titles/"



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
}


/* Display all movies and fill the carousel */
fetchAndUpdate()


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

/*  Call fetchMovies with selected parameters and add it to the carousel */
function fetchAndUpdate() {
    fetchMovies("", 1).then(movie => {
        addCarouselItem(movie.results[0], "top-rated")
        document.getElementsByClassName("banner-title")[0].innerText = movie.results[0].title
    })
    fetchMovies("", 1).then(movie => {
        for (movie of movie.results) {
            addCarouselItem(movie, "best-rated")
        }
    })
    fetchMovies("Adventure", 1).then(movie => {
        for (movie of movie.results) {
            addCarouselItem(movie, "Adventure")
        }
    })
    fetchMovies("Sci-Fi", 1).then(movie => {
        for (movie of movie.results) {
            addCarouselItem(movie, "Sci-Fi")
        }
    })
    fetchMovies("Action", 1).then(movie => {
        for (movie of movie.results) {
            addCarouselItem(movie, "Action")
        }
    })
}

/* Add movies to the carousel */
function addCarouselItem(movie, carouselDivId) {
    /* Create a div and img element */
    const divItem = document.createElement("div");
    const image = document.createElement("img");

    /* Set image source to the movie url and alt to the title*/
    image.src = `${movie.image_url}`
    image.alt = `Image de couverture du film ${movie.title}`
    image.id = `${movie.id}`

    image.setAttribute("id", `${movie.id}`)
    image.onclick = onImgClicked;

    /* Add add image to the div */
    divItem.append(image)

    /* Query the path to the movies-carousel and add all information */
    const carousel = document.querySelector(`#${carouselDivId} > div > div.carousel-list`)
    carousel.append(image)
}

/* Update carousel"s movies */
function updateCarouselItem(movie, carouselDivId) {
    /* Get img element */
    const image = document.querySelector(`#${carouselDivId} > div > div.carousel-list > img`);

    /* Set image source to the movie url and alt to the title*/
    image.src = `${movie.image_url}`
    image.alt = `Image de couverture du film ${movie.title}`
    image.id = `${movie.id}`

    /* Query the path to the movies-carousel and add all information */
    const carousel = document.querySelector(`#${carouselDivId} > div > div.carousel-list`)
    carousel.append(image)
}

const pageCounter = []
pageCounter["best-rated-movies"] = { page: 1, genre: "" }
pageCounter["Adventure"] = { page: 1, genre: "Adventure" }
pageCounter["Sci-Fi"] = { page: 1, genre: "Sci-Fi" }
pageCounter["Action"] = { page: 1, genre: "Action" }

/* Function to handle arrows */
function scrollContainer(container, direction) {
    if (direction == "next") {
        fetchMovies(pageCounter[container].genre, ++pageCounter[container].page).then(movie => {
            for (movie of movie.results) {
                updateCarouselItem(movie, container)
            }
        })
    } else if (direction == "previous" && pageCounter[container].page != 1) {
        fetchMovies(pageCounter[container].genre, --pageCounter[container].page).then(movie => {
            for (movie of movie.results) {
                updateCarouselItem(movie, container)
            }
        })
    }
}
function newFunc(event) {
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }
}
/* Modal */
const onImgClicked = function(event) {
    const modal = document.getElementById("movie-modal");
    const movie_id = event.target.getAttribute("id");
    const span = document.getElementsByClassName("close-modal")[0];

    fetch(`${api_url}${movie_id}`)
        .then(res => res.json())
        .then(movie => {
            document.getElementsByClassName("movie-poster")[0].src = movie.image_url
            document.getElementsByClassName("movie-title")[0].innerHTML = `<h2><strong>${movie.title}</strong></h2>`
            document.getElementsByClassName("movie-genre")[0].innerHTML = `<p><strong>Genre(s): </strong>${movie.genres}</p>`
            document.getElementsByClassName("movie-release-date")[0].innerHTML = `<p><strong>Date de sortie: </strong>${movie.date_published}</p>`
            document.getElementsByClassName("movie-rated")[0].innerHTML = `<p><strong>Rated: </strong>${movie.rated}</p>`
            document.getElementsByClassName("movie-rating-imdb")[0].innerHTML = `<p><strong>Score IMDB: </strong>${movie.imdb_score}</p>`
            document.getElementsByClassName("movie-director")[0].innerHTML = `<p><strong>Réalisateur(s): </strong>${movie.directors}</p>`
            document.getElementsByClassName("movie-list-actors")[0].innerHTML = `<p><strong>Liste des acteurs: </strong>${movie.actors}</p>`
            document.getElementsByClassName("movie-duration")[0].innerHTML = `<p><strong>Duration: </strong>${movie.duration} minutes </p>`
            document.getElementsByClassName("movie-country-origin")[0].innerHTML = `<p><strong>Origine(s): </strong>${movie.countries}</p>`
            document.getElementsByClassName("movie-box-office-result")[0].innerHTML = `<p><strong>Résultat du box office: </strong>${movie.worldwide_gross_income ?? "Not available"}</p>`
            document.getElementsByClassName("movie-description")[0].innerHTML = `<p><strong>Synopsis: </strong>${movie.description}</p>`

            /* Display the modal */
            modal.style.display = "flex";
        })

    /* Close the modal when clicking on the button */
    span.onclick = function () {
        modal.style.display = "none";
    }

    /* Close the modal when clicking anywhere */
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}