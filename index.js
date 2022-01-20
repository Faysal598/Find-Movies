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
//debouncing search input
const debounce = (func, delay)=>{
    let timeoutId;

    return (...args) =>{
        if(timeoutId){
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(()=>{
            func.apply(null, args);
        }, delay)
    } 
}

const onInput = event => {
    fetchData(event.target.value);
}
input.addEventListener('input', debounce(onInput, 500));
