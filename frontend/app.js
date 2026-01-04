
// BUTTONS

const randomButton = document.querySelector('.js-random-button');
const clearHistoryButton = document.querySelector('.js-clear-history');
const searchButton = document.querySelector('.js-search-button');


// INPUTS

const searchInput = document.querySelector('.js-search-input');


// DISPLAY ELEMENTS

const searchHistoryDisplay = document.querySelector('.js-search-history'); 
const displayGrid = document.querySelector('.js-display_grid');
const loadingElement = document.querySelector('.js-loading');


// GLOBAL VARIABLES

const searchHistory = []; 
const dataObtained = []; 


// LOCAL STORAGE HELPERS

function saveWeatherToLocalStorage() {
  localStorage.setItem('weatherData', JSON.stringify(dataObtained));
}

function loadWeatherFromLocalStorage() {
  const savedData = localStorage.getItem('weatherData');
  if (savedData) {
    dataObtained.push(...JSON.parse(savedData));
    dataDisplay();
  }
}

function saveHistoryToLocalStorage() {
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function loadHistoryFromLocalStorage() {
  const savedHistory = localStorage.getItem('searchHistory');
  if (savedHistory) {
    searchHistory.push(...JSON.parse(savedHistory));
    renderSearchHistory();
  }
}

function renderSearchHistory() {
  searchHistoryDisplay.innerHTML = '';
  for (let i = searchHistory.length - 1; i >= 0; i--) {
    searchHistoryDisplay.innerHTML += `<p>${searchHistory[i]}</p>`;
  }
}


// DATA FETCH

async function fetchData(url) {
  loadingElement.style.display = 'block';
  displayGrid.innerHTML = '';
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    if (data.error) {
      displayGrid.innerHTML = `<div class='error-message'>Error: ${data.error}</div>`;
      return;
    }
    
    dataObtained.push(data);
    saveWeatherToLocalStorage();
    dataDisplay();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    displayGrid.innerHTML = `<div class='error-message'>Error occurred! Please try again.</div>`;
  } finally {
    loadingElement.style.display = 'none';
  }
}


// SEARCH WEATHER

async function searchWeather(cityName) {
  loadingElement.style.display = 'block';
  displayGrid.innerHTML = '';
  
  try {
    const response = await fetch('https://weather-app-3xpk.onrender.com/api/search/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: cityName })
    });
    
    const data = await response.json();
    
    if (data.error) {
      displayGrid.innerHTML = `<div class='error-message'>Error: ${data.error}</div>`;
      return;
    }
    
    dataObtained.push(data);
    saveWeatherToLocalStorage();
    dataDisplay();
    
    return data;
  } catch (error) {
    console.error('Search error:', error);
    displayGrid.innerHTML = `<div class='error-message'>Failed to fetch weather data. Please try again.</div>`;
  } finally {
    loadingElement.style.display = 'none'; 
  }
}


// DISPLAY DATA


const dataDisplay = () => {
  displayGrid.innerHTML = '';

  if (dataObtained.length > 0) {
    dataObtained.forEach((weather) => {
      displayGrid.innerHTML = `
        <div class="weather-card">
          <button class="delete-card">×</button>
          <h2 class="city-name">${weather.city}, ${weather.country}</h2>
          <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}" class="weather-icon">
          <p class="temp">🌡️ ${Math.round(weather.temp)}°C</p>
          <p class="description">${weather.description}</p>

          <div class="details">
            <div class="details-left">
              <p><strong>Main:</strong> ${weather.main}</p>
              <p><strong>Feels like:</strong> ${Math.round(weather.feels_like)}°C</p>
              <p><strong>Humidity:</strong> ${weather.humidity}%</p>
              <p><strong>Wind:</strong> ${weather.wind} m/s</p>
            </div>
            <div class="details-right">
              <p><strong>Pressure:</strong> ${weather.pressure} hPa</p>
              <p><strong>Ground level:</strong> ${weather.grnd_level} hPa</p>
              <p><strong>Sea level:</strong> ${weather.sea_level} hPa</p>
              <p><strong>Max/Min:</strong> ${Math.round(weather.temp_max)}°C / ${Math.round(weather.temp_min)}°C</p>
              <p><strong>Sunrise:</strong> ${new Date(weather.sunrise * 1000).toLocaleTimeString()}</p>
              <p><strong>Sunset:</strong> ${new Date(weather.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      ` + displayGrid.innerHTML; // newest on top
    });
  } else {
    displayGrid.innerHTML = `
      <div class="placeholder">
        <p>No weather data available. Start by searching for a city or getting a random one!</p>
      </div>
    `;
  }
};


// RANDOM BUTTON CLICK

randomButton.addEventListener('click', () => {
  fetchData('https://weather-app-3xpk.onrender.com/api/data/');
});


// SEARCH BUTTON CLICK

searchButton.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (!city) return;
  
  searchWeather(city);
  
  searchHistory.push(city);
  saveHistoryToLocalStorage();
  renderSearchHistory();
  
  searchInput.value = '';
});


// CLEAR HISTORY

clearHistoryButton.addEventListener('click', () => {
  searchHistory.length = 0;
  localStorage.removeItem('searchHistory');
  searchHistoryDisplay.innerHTML = '';
});


// DELETE CARD HANDLER (Permanent)

function handleCardDeletion(event) {
  if (event.target.classList.contains('delete-card')) {
    const card = event.target.closest('.weather-card');
    if (card) {
      const cityName = card.querySelector('h2').textContent.split(',')[0];
      const index = dataObtained.findIndex(w => w.city === cityName);
      if (index !== -1) {
        dataObtained.splice(index, 1);
        saveWeatherToLocalStorage();
      }
      card.remove();
    }
  }
}

// Event delegation for dynamic cards
displayGrid.addEventListener('click', handleCardDeletion);


// LOAD LOCAL STORAGE ON PAGE LOAD

loadWeatherFromLocalStorage();
loadHistoryFromLocalStorage();