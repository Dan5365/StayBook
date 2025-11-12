// Weather API Integration for Hotel Location (Almaty, Kazakhstan)
function loadWeather() {
  const weatherInfo = document.getElementById('weather-info');
  
  if (!weatherInfo) return;

  // Check if user is logged in
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    weatherInfo.innerHTML = '<div class="weather-loading">Please log in to see weather information.</div>';
    return;
  }

  // Almaty, Kazakhstan coordinates
  const latitude = 43.2220;
  const longitude = 76.8512;

  // Using Open-Meteo API (free, no API key required)
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia/Almaty`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      if (data.current) {
        const current = data.current;
        const temp = Math.round(current.temperature_2m);
        const humidity = current.relative_humidity_2m;
        const windSpeed = current.wind_speed_10m;
        const weatherCode = current.weather_code;

        // Weather code descriptions (simplified)
        const weatherDescriptions = {
          0: 'Clear sky',
          1: 'Mainly clear',
          2: 'Partly cloudy',
          3: 'Overcast',
          45: 'Foggy',
          48: 'Depositing rime fog',
          51: 'Light drizzle',
          53: 'Moderate drizzle',
          55: 'Dense drizzle',
          61: 'Slight rain',
          63: 'Moderate rain',
          65: 'Heavy rain',
          71: 'Slight snow',
          73: 'Moderate snow',
          75: 'Heavy snow',
          80: 'Slight rain showers',
          81: 'Moderate rain showers',
          82: 'Violent rain showers',
          85: 'Slight snow showers',
          86: 'Heavy snow showers',
          95: 'Thunderstorm',
          96: 'Thunderstorm with slight hail',
          99: 'Thunderstorm with heavy hail'
        };

        const weatherDesc = weatherDescriptions[weatherCode] || 'Unknown';

        // Get weather emoji based on code
        let weatherEmoji = '🌤️';
        if (weatherCode === 0 || weatherCode === 1) weatherEmoji = '☀️';
        else if (weatherCode === 2) weatherEmoji = '⛅';
        else if (weatherCode === 3) weatherEmoji = '☁️';
        else if (weatherCode >= 45 && weatherCode <= 48) weatherEmoji = '🌫️';
        else if (weatherCode >= 51 && weatherCode <= 67) weatherEmoji = '🌧️';
        else if (weatherCode >= 71 && weatherCode <= 86) weatherEmoji = '❄️';
        else if (weatherCode >= 95) weatherEmoji = '⛈️';

        weatherInfo.innerHTML = `
          <div class="weather-data">
            <div class="weather-item">
              <strong>${weatherEmoji} Condition</strong>
              <span>${weatherDesc}</span>
            </div>
            <div class="weather-item">
              <strong>🌡️ Temperature</strong>
              <span>${temp}°C</span>
            </div>
            <div class="weather-item">
              <strong>💧 Humidity</strong>
              <span>${humidity}%</span>
            </div>
            <div class="weather-item">
              <strong>💨 Wind Speed</strong>
              <span>${windSpeed} km/h</span>
            </div>
          </div>
          <p style="text-align: center; margin-top: 15px; color: var(--text); font-size: 0.9rem; opacity: 0.8;">
            📍 Almaty, Kazakhstan
          </p>
        `;
      } else {
        weatherInfo.innerHTML = '<div class="weather-loading">Unable to fetch weather data.</div>';
      }
    })
    .catch(error => {
      console.error('Weather API error:', error);
      weatherInfo.innerHTML = `
        <div class="weather-loading">
          <p>Unable to load weather information at this time.</p>
          <p style="font-size: 0.85rem; margin-top: 10px; opacity: 0.7;">Please check your internet connection.</p>
        </div>
      `;
    });
}

// Expose loadWeather globally
window.loadWeather = loadWeather;

// Load weather on page load if user is logged in
document.addEventListener('DOMContentLoaded', function() {
  loadWeather();
  
  // Listen for login events
  window.addEventListener('userLoggedIn', function() {
    setTimeout(loadWeather, 300);
  });
});

