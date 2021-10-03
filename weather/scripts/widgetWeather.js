let openWeatherKey = 'a08e68a65301c77ef3352513fe3301e8';
let region = 'ua';
let sity = 'kiev';
let temp = '?';

fetch(`http://api.openweathermap.org/data/2.5/weather?q=${sity},${region}&APPID=${openWeatherKey}`)
	.then(response => response.json() )
	.then(json => document.getElementById("widgetWeather").getElementsByTagName("tr")[2].getElementsByTagName("td")[0].innerHTML = `${parseInt(json["main"]["temp"])-272}&degC`);

let date = new Date();

document.getElementById("widgetWeather").getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML = `${date.getHours()}:${date.getMinutes()}`;
