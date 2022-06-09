

//global constants
const apiKey = "c8c76922ee7c4dd97d3748894c18cac3"



// grabbing elements
let movieSearchForm = document.querySelector("#form");
let loadBtn = document.querySelector("#load-more-movies-btn");
let movieGrid = document.querySelector("#movies-grid");
let movieCard = document.querySelector("#movie-card")


 


movieSearchForm.addEventListener("submit", (evt) => {
    evt.preventDefault(); // prevent page from reload
    console.log("evt.target.movie.value =", evt.target.movie.value);
    let apiUrl = "https://api.themoviedb.org/3/search/movie" + "?api_key=" + apiKey +"&query=" + evt.target.movie.value;
    console.log("apiUrl =", apiUrl);
    console.log(getResults(apiUrl));

    
    

    

})



async function getResults(apiUrl) {
    let response =  await fetch(apiUrl);
    console.log("response is: ", response);
    let responseData =  await response.json();
    displayResults(responseData);

}




function displayResults(moviesList) {
    moviesList.results.forEach((movie) => {
        movieGrid.innerHTML += `<img src="https://image.tmdb.org/t/p/original/${movie.poster_path}">`
    });
}










function revealButton() {
    loadBtn.style.display = "inline-block";
}