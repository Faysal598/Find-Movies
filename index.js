const fetchData = async (searchTerm)=> {
    //we have to wait for getting response from the url
    const response = await axios.get('http://www.omdbapi.com/', { 
        //this object will turned into string and append it at the end of the url
        params: {
            apiKey: 'f028060f',
            s: searchTerm //movie we want to search
        }
    });
    console.log(response.data);
}

const input = document.querySelector('input');
//delaying search input
let timeOutId;
const onInput = e => {
    if(timeOutId){
        clearTimeout(timeOutId);
    }

    timeOutId = setTimeout(() => {
        fetchData(e.target.value);
    }, 1000)
}
input.addEventListener('input', onInput);
