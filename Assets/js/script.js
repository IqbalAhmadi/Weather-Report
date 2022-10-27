var key = "8191da8a9c456bb383721b6d870ef05d"
var searchBtn = document.querySelector("#search-btn");
var currentWeather = document.querySelector("#current-weather");
function getWeather (cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`
    fetch(apiUrl)
    .then(response => response.json())
       .then(data => {
        console.log(data);
        currentWeather.innerHTML = `<h3 id="title">${data.name}</h3>
        <p>Temp: ${data.main.temp}</p>
        <p>Wind: ${data.wind.speed}</p>
        <p>Humidity: ${data.main.humidity}</p>`
        var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${key}&units=imperial`
        fetch(url)
        .then(response => response.json())
        .then(fiveDay => {
            console.log(fiveDay);
        })
        // dayOne.innerHTML = 
       })
} 
searchBtn.addEventListener("click", (event) => {
    var searchCity = document.querySelector ("#search-city")
    getWeather(searchCity.value)
})