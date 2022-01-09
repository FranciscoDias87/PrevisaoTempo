const api = {
    key: '251d05335fca446ab7414111220401',
    baseURL: 'http://api.weatherapi.com/v1/',
    lang: 'pt'
}

const city = document.querySelector('.city');
const date =  document.querySelector('.date');
const container_img = document.querySelector('.container-img');
const container_temp = document.querySelector('.container-temp');
const temp_number = document.querySelector('.container-temp div');
const temp_unit = document.querySelector('.container-temp span');
const weather_t = document.querySelector('.weather');
const hi_low = document.querySelector('.hi_low');
const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');

search_button.addEventListener('click', function(){
    searchResults(search_input.value);
})

search_input.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(search_input.value)
    }
}

function searchResults(city,lang){
    fetch(`${api.baseURL}current.json?key=${api.key}&q=${city}&lang=${lang}`)
    .then(response => {
        if (!response.ok){
            throw new Error (`Http Error: status ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        alert(error.message);
    })
    .then(response =>{
        diplayResults(response);
    });
}

function diplayResults(weather){
    console.log(weather);
    
    city.innerText = `${weather.location.name}, ${weather.location.region}, ${weather.location.country}`

    
}
