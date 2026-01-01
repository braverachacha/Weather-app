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
randomButton.addEventListener('click', ()=>{
  fetch('')
    .then(res => res.json())
    if (!res.ok) {
      throw new Error('Error occured!');
    }
    .then(data => {
      randomData.push(data)
      console.log(randomData)
    })
    .catch(err => console.error(err));
})
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
