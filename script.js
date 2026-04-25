// API configuration
const apiKey = 'YOUR_API_KEY'; // Replace with your real API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather by city
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (response.ok) {
            displayWeatherData(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        handleError(error);
    }
}

// Function to fetch weather by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (response.ok) {
            displayWeatherData(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        handleError(error);
    }
}

// Event listener for search
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('search-input').value;
    if (city) {
        fetchWeatherByCity(city);
    }
});

// Geolocation support
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
    }, (error) => {
        handleError(error);
    });
}

// Function to display weather data
function displayWeatherData(data) {
    const weatherElement = document.getElementById('weather-data');
    weatherElement.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

// Function to handle errors
function handleError(error) {
    const weatherElement = document.getElementById('weather-data');
    weatherElement.innerHTML = `<p>Error: ${error.message}</p>`;
}
