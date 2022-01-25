const fetchData = async (searchTerm) => {
    //we have to wait for getting response from the url
    const response = await axios.get('http://www.omdbapi.com/', { 
        //this object will turned into string and append it at the end of the url
        params: {
            apiKey: 'f028060f',
            s: searchTerm //movie we want to search
        }
    });
    //if desired movie doesn't show
    if(response.data.Error){
        return [];
    }
    
    return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content result"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultWrapper = document.querySelector('.result');

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    //if there is nothing to show then close the widget
    if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
    }
    //প্রথম বার ইনপুট দেওয়ার পর আবার ইনপুট দেওয়ার জন্য
    resultWrapper.innerHTML = '';
    
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const options = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        options.classList.add('dropdown-item');
        options.innerHTML = `
            <img src = "${imgSrc}"/>
            ${movie.Title}
        `; 
        //when clicked on the specific movie then show the movie details
        options.addEventListener('click', ()=>{
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            //details of selected movie
            onMovieSelect(movie); 
        })

        resultWrapper.appendChild(options);
    }
}
input.addEventListener('input', debounce(onInput, 500));
//if user clicks outside the root then close the widget
document.addEventListener('click', e=>{
    if(!root.contains(e.target)){
        dropdown.classList.remove('is-active');  
    }
})

const onMovieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/', { 
        params: {
            apiKey: 'f028060f',
            i: movie.imdbID //search by ID
        }
    });
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};
//details of the movie
const movieTemplate = movieDetail => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};