const weather = document.querySelector(".js-weather");

const API_KEY = "e5d08fb0ef3108744a4231592b744f9d";
const COORDS = 'coords';

function getWeather(lat, lng) {
    //For temperature in Celsius use units=metric
    //then은 데이터가 완전히 들어 온 후 함수를 호출 
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}°C @ ${place}`;
        })
}

function saveCoords(coordsObject) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
}

// 위도 경도를 읽어옴. 
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObject);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('cant access ur geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        //getWeather
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();