const fetchData = async (searchTerm) => {
    //we have to wait for getting response from the url
    const response = await axios.get('http://www.omdbapi.com/', { 
        //this object will turned into string and append it at the end of the url
        params: {
            apiKey: 'f028060f',
            s: searchTerm //movie we want to search
        }
    });
    
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
    
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const options = document.createElement('a');
        options.classList.add('dropdown-item');
        options.innerHTML = `
            <img src = "${movie.Poster}"/>
            ${movie.Title}
        `; 
        resultWrapper.appendChild(options);
    }
}
input.addEventListener('input', debounce(onInput, 500));
