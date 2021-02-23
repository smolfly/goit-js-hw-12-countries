import debounce from 'lodash.debounce';
import templateOneCountry from './templates/country.hbs';
import templateFewCountries from './templates/list-of-countries.hbs';
import { showError, showNotice } from './notification.js';


const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.countries'),
};


refs.form.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
  const inputValue = event.target.value;
  refs.container.innerHTML = '';
  fetchCountries(inputValue);
}

function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  if (!searchQuery) {
    showNotice('Please, enter country name!');
    return;
  }
  
  return fetch(url)
    .then(response => {

      if (response.status !== 200) {
        throw new Error('Error fetching data'); 
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data.length > 10) {
        showError(
          'Too many matches found. Please enter a more specific query!',
        );
      }
      else if (data.length >= 2 && data.length <= 10) {
        updateListOfCountries(data);
      } else {
        updateOneCountry(data);
       
      }
    })
    .catch(error => {
      if ((error = 404)) {
        showError('No matches were found! Check your request.');
      } else {
        showError('Oops! Something went wrong. Try again.');
      }
    });
}


function updateOneCountry(data) {
  const markup = templateOneCountry(data);
  refs.container.insertAdjacentHTML('beforeend', markup);
}

function updateListOfCountries(data) {
  const markup = templateFewCountries(data);
  refs.container.insertAdjacentHTML('beforeend', markup);
}