  // BUTTONS
const randomButton = document.querySelector('.js-random-button');
const clearHistoryButton = document.querySelector('.js-clear-history');
const searchButton = document.querySelector('.js-search-button');

// INPUTS
const searchInput = document.querySelector('.js-search-input');

// DISPLAY ELEMENTS
const searchHistoryDisplay = document.querySelector('.js-search-history'); 
const displayGrid = document.querySelector('.js-display_grid');


// GLOBAL VARIABLES
const searchHistory = []; 
const dataObtained = []; 
const randomData = [];


// LOGICS

// DATA FETCH 
async function fetchData(url) {
  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: `);
    }
    const data = await response.json();
    dataObtained.push(data)
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

randomButton.addEventListener('click', ()=>{
  fetchData('http://127.0.0.1:5000/api/data/')
  value = dataObtained;
  console.log(value)
})

const dataDisplay = ()=>{
  if (randomData.length > 0) {
    console.log(randomData)
  } else {
    console.log('blank')
  }
};
dataDisplay();

// HISORY UPDATE
const historyUpdate = ()=>{
  searchButton.addEventListener('click', ()=>{
    const value = searchInput.value.trim();
    if(!value) return;
    searchHistory.push(value)
    searchHistoryDisplay.innerHTML = '';
    searchHistory.forEach((history)=>{
      searchHistoryDisplay.innerHTML += `<p>${history}</p>`
    })
    searchInput.value = '';
  })
};

clearHistoryButton.addEventListener('click', ()=>{
  searchHistoryDisplay.innerHTML = '';
})

historyUpdate();
