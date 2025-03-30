// Base URL for the JSON Server that stores car data
const BASE_URL = 'https://json-sever-vercel-ten.vercel.app/cars';

// Selecting elements from the HTML
const carList = document.getElementById('car-list');
const newCarForm = document.getElementById('new-car-form');
const inputName = document.getElementById('car-name');
const inputModel = document.getElementById('car-model');
const inputPrice = document.getElementById('car-price');
const inputImage = document.getElementById('car-image');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('searchBtn');

let allCars = [];

document.addEventListener('DOMContentLoaded', function() {
  fetchCars();
});
function fetchCars() {
  fetch(BASE_URL)
      .then(function(response) {
          if (!response.ok) {
              throw new Error('Failed to fetch cars');
          }
          return response.json();
      })
      .then(function(carsData) {
          allCars = carsData; // Store fetched cars
          renderCars(allCars); // Display them on the page
      })
      .catch(function(error) {
          console.error('Error fetching cars:', error);
      });
}
newCarForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the page from refreshing
  if (!inputName.value || !inputModel.value || !inputPrice.value || !inputImage.value) {
    alert('Please fill all fields!');
    return;
}
