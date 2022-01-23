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
}

const input = document.querySelector('input');

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    
    for (let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src = "${movie.Poster}"/>
            <h2>${movie.Title}</h2>
        `; 
    document.querySelector('#target').appendChild(div);
    }
}
input.addEventListener('input', debounce(onInput, 500));
