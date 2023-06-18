// 53e4f4392a0d629abab20cd1fd5995f1
var srcUrl
var weatherIco = document.querySelector('#weather-ico')
var weatherTemp = document.querySelector('#weather-temp')
var weatherCity = document.querySelector('h4')
var weatherDescmin = document.querySelector('#weather-addons--descMin')
var weatherHumb = document.querySelector('#weather-humb')
var weatherPressure = document.querySelector('#weather-pressure')

document.querySelector('#weather-btn').addEventListener('click', () => {
    position(document.querySelector('#search-txt').value)
})

function position(value) {
    srcUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=53e4f4392a0d629abab20cd1fd5995f1`
    fetch(srcUrl)
        .then(function (resp) { 
            return resp.json() 
        })
        .then(function (data) {
            
            if(data.length <= 0) {
                weatherCity.innerText = 'Ошибка Города'
                return
            }
            checkWeather(data[0].lat, data[0].lon)
        } 
);

}

function checkWeather(lat, lon) {
    srcUrl  = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=53e4f4392a0d629abab20cd1fd5995f1&units=metric`;
    fetch(srcUrl)
        .then(resp => {
            return resp.json() 
        
        })
        .then(data => {
            console.log(data)
            var _temp = Math.round(data.main.temp);
            var _icon = data.weather[0].icon;
            var _descMin = data.weather[0].description
            var _descHumb = data.main.humidity;
            var _pressure = Math.round(data.main.pressure * 0.750064);
            if(_temp > 0) {
                weatherTemp.innerHTML = '+' + _temp
            } else {
                weatherTemp.innerHTML = '-' + _temp
            }
            weatherIco.src = `https://openweathermap.org/img/wn/${_icon}.png`
            weatherCity.innerText = data.name
            weatherDescmin.innerHTML = _descMin
            weatherHumb.innerHTML = '~' + _descHumb + '%'
            weatherPressure.innerHTML =`${_pressure} <br><span style="font-size: 1.1rem">мм рт. ст.</span>`
        } )
}

