const api = {
    key: '251d05335fca446ab7414111220401',
    baseURL: 'https://api.weatherapi.com/v1/',
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

function searchResults(city){
    fetch(`${api.baseURL}search.json?key=${api.key}&q=${city}&lang=${api.lang}`)
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

    let now =  new Date();
    date.innerText =  dateDetails(now);

    let iconName = weather.current.condition.icon;
    container_img.innerHTML = `<img src="${iconName}">`;

    let temperature = `${Math.round(weather.current.temp_c)}`;
    temp_number.innerText = temperature;
    temp_unit.innerText = '°C';

    let weatherNow = `Agora: ${weather.current.condition.text}`;
    let prevision = `Previsão: ${weather.forecast.forecastday[0].day.condition.text}`;
    weather_t.innerText = `${weatherNow}
                           ${prevision}`;

    let mintemp_c = `Min: ${Math.round(weather.forecast.forecastday[0].day.mintemp_c)}°C`;
    let maxtemp_c = `Max: ${Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}°C`
    hi_low.innerText = `${mintemp_c} / ${maxtemp_c}`;
}

function dateDetails(d){
    let dayOfWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    let months = ['Janeiro', 'Fereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    let weekday = dayOfWeek[d.getDay()]; //0-6
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = `0:${d.getMinutes()}`.slice(-2);  

    return `${weekday}, ${date} de ${month} de ${year}, ${hour}:${minutes}Hr`;
}