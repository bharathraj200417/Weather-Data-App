
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherData = document.getElementById('weatherData');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');


const API_KEY = '973af622a272b171513f6e3f989cfd64';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';


searchBtn.addEventListener('click', getWeatherData);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData();
    }
});


async function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    
    showLoading();
    
    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else {
                throw new Error('An error occurred while fetching weather data. Please try again later.');
            }
        }
        
        const data = await response.json();
        displayWeatherData(data);
    } catch (err) {
        showError(err.message);
    }
}


function displayWeatherData(data) {
   
    loading.classList.add('hidden');
    error.classList.add('hidden');
    
  
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    
    
    weatherData.classList.remove('hidden');
}


function showLoading() {
    weatherData.classList.add('hidden');
    error.classList.add('hidden');
    loading.classList.remove('hidden');
}


function showError(message) {
    weatherData.classList.add('hidden');
    loading.classList.add('hidden');
    error.textContent = message;
    error.classList.remove('hidden');
}


cityInput.focus();
