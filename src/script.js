
function updateTemp(response) {
    let tempElement = document.querySelector("#weather-temperature");
    let temperature = Math.round(response.data.temperature.current); 
    tempElement.innerHTML = temperature;

    let cityElement = document.querySelector("#search-city");
    cityElement.innerHTML = response.data.city;
}


function searchCity(city) {
    let apiKey = "52t2ff0fofee82bd34831c3b064a32e5";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(updateTemp);
    
}

function searchSubmit(event) {
    event.preventDefault();

    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
