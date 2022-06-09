

//global constants
const apiKey = "c8c76922ee7c4dd97d3748894c18cac3"


//global var
var offset = 1;
var searchTerm = "";


var popupWindow = document.getElementById("movie-popup-window");
var popupContent = document.getElementById("movie-popup-content");

// grabbing elements
let movieSearchForm = document.querySelector("#form");
let movieGrid = document.querySelector("#movies-grid");
let closeBtn = document.querySelector("#close-search-btn");
let loadBtn = document.querySelector("#load-more-movies-btn");
let searchInput = document.querySelector("#search-input");


let moviePoster = document.querySelector("#movie-poster");









 


movieSearchForm.addEventListener("submit", (evt) => {
    evt.preventDefault(); // prevent page from reload
    if (evt.target.movie.value !== ""){
        console.log("evt.target.movie.value =", evt.target.movie.value);
        searchTerm = evt.target.movie.value;
        offset = 1;
        let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&query=" + evt.target.movie.value;
        console.log("apiUrl =", apiUrl);
        getResults(apiUrl);
        movieGrid.innerHTML = "";
    }
    else{
        alert("Enter a movie to search for!")
    }
  
})

loadBtn.addEventListener("click", (evt) => {
    evt.preventDefault(); // prevent page from reload
    console.log("search term is =", searchTerm);
    if (searchTerm === "") { // search term is empty, so user wishes to display more current movies
        let apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&language=en-US" + "&page=" + offset
        getResults(apiUrl);
    }
    else { // search term isn't empty, so user wishes to display more movies based off of search term
        let apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + searchTerm + "&page=" + offset;
        getResults(apiUrl);
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
            <img class = "movie-poster" onclick = "popUp(${movie.id})" src="https://image.tmdb.org/t/p/w400/${movie.poster_path}" alt="Poster for ${movie.original_title}">
            <div class ="voting-info"><img class = "movie-voting-image" src="star.png" alt="Star emoticon" width = "40px" height = "40px"></img><p class ="movie-votes">${movie.vote_average}/10 - </p>
            <p class = "movie-release-date">Released on ${movie.release_date}</p></div>
        </div>`

    });
}



function popUp(movieID) {
    console.log(123123, movieID);
    let apiUrl = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey + "&language=en-US"
    console.log(apiUrl);
    //console.log(getResults(apiUrl))


    popupWindow.style.display = "block";


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



window.onclick = function(event) {
    if (event.target == popupWindow) {
        popupWindow.style.display = "none";
    }
  }

