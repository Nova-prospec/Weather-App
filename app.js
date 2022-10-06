let searchBox = document.querySelector(".search-box");
let searchBtn = document.querySelector(".search-btn")
let cityName = document.querySelector(".city-name")
let weather = document.querySelector(".weather");
let mainTemp  = document.querySelector(".temp");
let maxTemp = document.querySelector(".max-temp");
let minTemp  = document.querySelector(".min-temp");
let humidity = document.querySelector(".humidity")


const getWeatherData = async (city) => {
    let API_KEY = `a8e71c9932b20c4ceb0aed183e6a83bb`
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        let response = await fetch(FULL_URL)
        let data = await response.json()
        let weatherData= data
        console.log(data.main);
        showWeatherData(weatherData)
    }catch(error){
        console.error(error);
    }
}

function showWeatherData(data) {
    let weatherDesc = data.weather[0].main
    let weatherTemp  = data.main.temp;
    let min = data.main.temp_min;
    let max = data.main.temp_max
    let hum = data.main.humidity;
    let areaName = data.name
    console.log({weatherDesc, min, max, areaName, weatherTemp})
    weather.innerHTML = weatherDesc
    mainTemp.innerHTML = `Temperature: ${weatherTemp} °C`
    maxTemp.innerHTML = `Max Temp: ${max} °C`
    minTemp.innerHTML = `Min Temp: ${min} °C`
    cityName.innerHTML = areaName
    humidity.innerHTML  = `Humidity: ${hum}%`
}


function getAreaName(){
    if (searchBox.value  == "") {
        let error = document.querySelector(".error")
        error.innerHTML = "Search Box cannot be empty!"
        setTimeout(() => {
            error.innerHTML = ""
        }, 3000);
    } else{
        getWeatherData(searchBox.value)
    }   
}

searchBtn.addEventListener("click", getAreaName)