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

// DATA FETCH 
async function fetchData(url) {
  loadingElement.style.display = 'block'; // Show loading
  displayGrid.innerHTML = ''; // Clear previous content
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.error) {
      displayGrid.innerHTML = `<div class='error-message'>Error: ${data.error}</div>`;
      return;
    }
    
    dataObtained.push(data);
    dataDisplay();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    displayGrid.innerHTML = `<div class='error-message'>Error occurred! Please try again.</div>`;
  } finally {
    loadingElement.style.display = 'none'; // Hide loading when done
  }
}

// DATA SEARCH AND DISPLAY
// DATA SEARCH AND DISPLAY
async function searchWeather(cityName) {
  loadingElement.style.display = 'block'; // Show loading
  displayGrid.innerHTML = ''; // Clear previous content
  
  try {
    const response = await fetch('https://weather-app-3xpk.onrender.com/api/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city: cityName })
    });
    
    const data = await response.json();
    
    if (data.error) {
      displayGrid.innerHTML = `<div class='error-message'>Error: ${data.error}</div>`;
      return;
    }
    
    dataObtained.push(data);
    dataDisplay();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Search error:', error);
    displayGrid.innerHTML = `<div class='error-message'>Failed to fetch weather data. Please try again.</div>`;
  } finally {
    loadingElement.style.display = 'none'; // Hide loading when done
  }
}


// DISPLAY DATA
const dataDisplay = () => {
  if (dataObtained.length > 0) {
    displayGrid.innerHTML = '';
    dataObtained.forEach((weather) => {
      displayGrid.innerHTML += `
        <div class="weather-card">
          <h2>${weather.city}, ${weather.country}</h2>
          <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}">
          <p class="temp">${Math.round(weather.temp)}°C</p>
          <p class="description">${weather.description}</p>
          <div class="details">
            <p>Feels like: ${Math.round(weather.feels_like)}°C</p>
            <p>Humidity: ${weather.humidity}%</p>
            <p>Wind: ${weather.wind} m/s</p>
            <p>Max: ${Math.round(weather.temp_max)}°C | Min: ${Math.round(weather.temp_min)}°C</p>
          </div>
        </div>
      `;
    });
  } else {
    console.log('No data available');
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
  searchHistoryDisplay.innerHTML = '';
  searchHistory.forEach((history) => {
    searchHistoryDisplay.innerHTML += `<p>${history}</p>`;
  });
  
  searchInput.value = '';
});

clearHistoryButton.addEventListener('click', () => {
  searchHistoryDisplay.innerHTML = '';
});
