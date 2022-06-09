

//global constants
const apiKey = "c8c76922ee7c4dd97d3748894c18cac3"


//global var
var offset = 1;
var searchTerm = "";

// grabbing elements
let movieSearchForm = document.querySelector("#form");
let movieGrid = document.querySelector("#movies-grid");
let closeBtn = document.querySelector("#close-search-btn");
let loadBtn = document.querySelector("#load-more-movies-btn");
let searchInput = document.querySelector("#search-input");



 


movieSearchForm.addEventListener("submit", (evt) => {
    evt.preventDefault(); // prevent page from reload
    console.log("evt.target.movie.value =", evt.target.movie.value);
    searchTerm = evt.target.movie.value;
    offset = 1;
    let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&query=" + evt.target.movie.value;
    console.log("apiUrl =", apiUrl);
    console.log(getResults(apiUrl));
    movieGrid.innerHTML = "";
})

loadBtn.addEventListener("click", (evt) => {
    evt.preventDefault(); // prevent page from reload
    console.log("search term is =", searchTerm);
    if (searchTerm === "") {
        let apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&language=en-US" + "&page=" + offset
        getResults(apiUrl);
    }
    else {
        let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + searchTerm + "&page=" + offset;
        console.log(getResults(apiUrl));
    }

})




async function getResults(apiUrl) {
    let response =  await fetch(apiUrl);
    offset += 1;
    console.log("Page offset =", offset);
    console.log("response is: ", response);
    let responseData =  await response.json();
    displayResults(responseData);

}



function displayResults(moviesList) {
    moviesList.results.forEach((movie) => {
        movieGrid.innerHTML += ` 
        <div class = "movie-card">
            <h2 class = "movie-title">${movie.original_title}</h2>
            <img class = "movie-poster" onclick="popupWindow()" src="https://image.tmdb.org/t/p/w400/${movie.poster_path}" alt="Poster for ${movie.original_title}">
            <div class ="voting-info"><img class = "movie-voting-image" src="star.png" alt="Star emoticon" width = "40px" height = "40px"></img><p class ="movie-votes">${movie.vote_average} - </p>
            <p class = "movie-release-date">Released on ${movie.release_date}</p></div>
        </div>`
    });
}



function popupWindow() {
    
}


function closeButton() {
    form.reset();
    location.reload();
}


function revealButton() {
    loadBtn.style.display = "inline-block";
}


window.onload = function() {

    let apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&language=en-US" + "&page=" + offset
    getResults(apiUrl);

}