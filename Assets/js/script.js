var key = '8191da8a9c456bb383721b6d870ef05d'
var searchBtn = document.querySelector('#search-btn')
var currentWeather = document.querySelector('#current-weather')
var fiveDayEl = document.querySelector('#fiveDay')
var windEl = document.querySelector('.wind')
var humidityEl = document.querySelector('.humidity')

function checkLocalStorage() {
  const lastCity = localStorage.getItem('lastSearch')
  const buttonEl = document.createElement('button')
  buttonEl.textContent = lastCity
  buttonEl.classList.add('btn')
  document.getElementById('search-history').appendChild(buttonEl)
  console.log(lastCity)
}
checkLocalStorage() // runs the function on page load

//!! ==== Need clarification 👇 =========== //
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//! ==== End of clarification 👆 ========== //

function clearHistroyDiv() {
  document.getElementById('search-history').innerHTML = ''
}

function getWeather(cityName) {
  localStorage.setItem('lastSearch', cityName)
  clearHistroyDiv() // runs the function
  checkLocalStorage()

  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      currentWeather.innerHTML = `<h3 id="title">${data.name}</h3>
        <p>Temp: ${data.main.temp}</p>
        <p>Wind: ${data.wind.speed}</p>
        <p>Humidity: ${data.main.humidity}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`

      var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${key}&units=imperial`
      fetch(url)
        .then((response) => response.json())
        .then((fiveDay) => {
          console.log(fiveDay.list.length)
          for (var i = 3; i < fiveDay.list.length; i += 8) {
            console.log(fiveDay.list[i])
            var card = document.createElement('div')
            card.classList.add('col-sm-2')

            var content = `
                <div class="card border-dark">
                    <div id="dayOne" class="card-body">
                        <h5 class="card-title">${fiveDay.list[i].dt_txt}</h5>
                        <p class="temp">Temp: ${fiveDay.list[i].main.temp}</p>
                        <p class="wind">Wind: ${fiveDay.list[i].wind.speed}</p>
                        <p class="humidity">Humidity: ${fiveDay.list[i].main.humidity}</p>
                        <img src="http://openweathermap.org/img/wn/${fiveDay.list[i].weather[0].icon}@2x.png"/>
                        
                    </div>
                </div>`
            card.innerHTML = content
            fiveDayEl.appendChild(card)
          }
        })
    })
}
searchBtn.addEventListener('click', (event) => {
  var searchCity = document.querySelector('#search-city')
  getWeather(searchCity.value)
})
