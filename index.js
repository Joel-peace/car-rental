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
const newCar = {
  name: inputName.value.trim(),
  model: inputModel.value.trim(),
  price: parseFloat(inputPrice.value),
  image: inputImage.value.trim()
};
fetch(BASE_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newCar)
})
.then(function(response) {
  if (!response.ok) {
      throw new Error('Failed to add car');
  }
  return response.json();
})
.then(function() {
  newCarForm.reset(); // Clear the form fields
  fetchCars(); // Refresh the car list
})
.catch(function(error) {
  console.error('Error adding car:', error);
});
});
function updateCar(id) {
  const carToUpdate = allCars.find(function(car) {
      return car.id === id;
  });

  const updatedCar = {
      name: prompt('Enter new name:', carToUpdate.name) || carToUpdate.name,
      model: prompt('Enter new model:', carToUpdate.model) || carToUpdate.model,
      price: parseFloat(prompt('Enter new price:', carToUpdate.price)) || carToUpdate.price,
      image: prompt('Enter new image URL:', carToUpdate.image) || carToUpdate.image
  };

  fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCar)
  })
  .then(function(response) {
      if (!response.ok) {
          throw new Error('Failed to update car');
      }
      return response.json();
  })
  .then(function() {
      fetchCars();
  })
  .catch(function(error) {
      console.error('Error updating car:', error);
  });
}
