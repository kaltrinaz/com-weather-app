
function updateTemp(response) {
    let tempElement = document.querySelector("#weather-temperature");
    let temperature = Math.round(response.data.temperature.current); 
    tempElement.innerHTML = temperature;
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconImg = document.querySelector("#weather-icon-url");
    let cityElement = document.querySelector("#search-city");

    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
    iconImg.innerHTML = `<img src="${response.data.condition.icon_url}" alt=""></img>`
    cityElement.innerHTML = response.data.city;

    getForecast(response.data.city);
}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes},`;
}


function searchCity(city) {
    let apiKey = "52t2ff0fofee82bd34831c3b064a32e5";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateTemp);
    
}

function searchSubmit(event) {
    event.preventDefault();

    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}


function formatDay(timestamp) {
    let date = new Date (timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days [date.getDay()];
    
}
function displayForecast(response) {
    let forecast = document.querySelector("#forecast");
    let forecastHtml = "";

    response.data.daily.forEach(function(day, index){
        if (index < 5){
        
        forecastHtml += `
            <div class="weather-forecast-day">
    <div class="forecast-day">${formatDay(day.time)}</div>
    <div class="forecast-icon">
        <img src="${day.condition.icon_url}" alt="Weather icon" />
    </div>
    <div class="forecast-temperature">
        <div class="forecast-temperature-low"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
        <div class="forecast-temperature-up">${Math.round(day.temperature.minimum)}°</div>
    </div>
</div>`;
    }});

   
    forecast.innerHTML = forecastHtml;
}

function getForecast(city) {
    let apiKey = "52t2ff0fofee82bd34831c3b064a32e5";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
    
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("London");
