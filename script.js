

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
        closeBtn.style.display = "block";
    }
    else{
        alert("Enter a movie to search for!");
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
        if (movie.poster_path) {
            movieGrid.innerHTML += ` 
            <div class = "movie-card">
                <h2 class = "movie-title">${movie.original_title}</h2>
                <img class = "movie-poster" onclick = "popUp(${movie.id})" src="https://image.tmdb.org/t/p/w400/${movie.poster_path}" alt="Poster for ${movie.original_title}">
                <div class ="voting-info"><img class = "movie-voting-image" src="star.png" alt="Star emoticon" width = "40px" height = "40px"></img><p class ="movie-votes">${movie.vote_average}/10 - </p>
                <p class = "movie-release-date">Released on ${movie.release_date}</p></div>
            </div>`

        }
        else {
            movieGrid.innerHTML += ` 
            <div class = "movie-card">
                <h2 class = "movie-title">${movie.original_title}</h2>
                <img class = "movie-poster" onclick = "popUp(${movie.id})" src="placeholder-poster.jpg" width = "400px" height = "550px" alt="Poster for ${movie.original_title}">
                <div class ="voting-info"><img class = "movie-voting-image" src="star.png" alt="Star emoticon" width = "40px" height = "40px"></img><p class ="movie-votes">${movie.vote_average}/10 - </p>
                <p class = "movie-release-date">Released on ${movie.release_date}</p></div>
            </div>`
        }


    });
}



async function popUp(movieID) {
    console.log(123123, movieID);

    // api calls to grab MOVIE INFORMATION
    let apiUrl = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey + "&language=en-US"
    console.log(apiUrl);
    let response =  await fetch(apiUrl);
    console.log("response is: ", response);
    let responseData =  await response.json();
    console.log("POPUP DATA IS:", responseData)

    // api calls to grab VIDEO ID
    let videoapiUrl = "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + apiKey + "&language=en-US"
    let videoResponse =  await fetch(videoapiUrl);
    console.log("videoResponse is: ", videoResponse);
    let videoResponseData =  await videoResponse.json();
    console.log("VIDEO DATA IS:", videoResponseData)

    videoResponseData.results.forEach((movie, index) => {
        if (videoResponseData.results[index].name.includes('Official') || videoResponseData.results[index].name.includes('Original')){
            trailerKey = videoResponseData.results[index].key;
            console.log(trailerKey);
        }
        else {
            relatedVideoKey = videoResponseData.results[index].key;
        }

    })
  
    
    popupContent.innerHTML = `
        <span class = "close-popup-span" onclick = "closePopup()">&times;</span>
        <h2 class = "popup-trailer-title"><em>OFFICIAL TRAILER</em></h2>
        <iframe class = "popup-video" src="https://www.youtube.com/embed/${trailerKey}" allow="fullscreen;" allowfullscreen alt="Video trailer for${responseData.original_title}"></iframe>
        <div class ="popup-heading">
        <h3 class ="popup-title">${responseData.original_title}</h3>
        <h5 class = "popup-tagline"><em>${responseData.tagline}</em></h5>
        </div>
        <p class = "popup-info">${responseData.runtime} min | ${responseData.genres[0].name}, ${responseData.genres[1].name}</p>
        <p class ="popup-description">${responseData.overview}</p>

        <h3 class = "popup-related-videos">Related Videos & Images:</h3>
        <iframe class = "popup-related-vid" src="https://www.youtube.com/embed/${relatedVideoKey}" allow="fullscreen;" allowfullscreen ></iframe>
        <img class = "popup-backdrop" src="https://image.tmdb.org/t/p/w400/${responseData.backdrop_path}"></img>


    
    
    
    `


    popupWindow.style.display = "block";


}


function closeButton() {
    form.reset();
    location.reload();
}


function revealButton() {
    loadBtn.style.display = "inline-block";
}

function closePopup() {
    popupWindow.style.display = "none";
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

