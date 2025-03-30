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

// This will store all the fetched cars
let allCars = [];

// When the page loads, fetch the cars
document.addEventListener('DOMContentLoaded', function() {
    fetchCars();
});

// Function to fetch cars from the server
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

// Function to handle form submission and add a new car
newCarForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the page from refreshing

    // Check if all input fields are filled
    if (!inputName.value || !inputModel.value || !inputPrice.value || !inputImage.value) {
        alert('Please fill all fields!');
        return;
    }

    // Create a new car object with input values
    const newCar = {
        name: inputName.value.trim(),
        model: inputModel.value.trim(),
        price: parseFloat(inputPrice.value),
        image: inputImage.value.trim()
    };

    // Send a request to add the new car to the server
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

// Function to update an existing car
function updateCar(id) {
    // Find the car in the list by its ID
    const carToUpdate = allCars.find(function(car) {
        return car.id === id;
    });

    // Prompt the user to enter new details (if empty, keep the old value)
    const updatedCar = {
        name: prompt('Enter new name:', carToUpdate.name) || carToUpdate.name,
        model: prompt('Enter new model:', carToUpdate.model) || carToUpdate.model,
        price: parseFloat(prompt('Enter new price:', carToUpdate.price)) || carToUpdate.price,
        image: prompt('Enter new image URL:', carToUpdate.image) || carToUpdate.image
    };

    // Send a request to update the car in the server
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
        fetchCars(); // Refresh the car list
    })
    .catch(function(error) {
        console.error('Error updating car:', error);
    });
}

// Function to delete a car from the list
function deleteCar(id) {
    // Confirm before deleting the car
    if (confirm('Are you sure you want to delete this car?')) {
        fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deleted: true }) // Marks as deleted instead of removing
        })
        .then(function() {
            fetchCars(); // Refresh the car list
        })
        .catch(function(error) {
            console.error('Error deleting car:', error);
        });
    }
}

// Function to display cars on the page
function renderCars(cars) {
    carList.innerHTML = ''; // Clear the current list

    if (!cars || cars.length === 0) {
        carList.innerHTML = '<p>No cars found.</p>';
        return;
    }

    // Loop through the cars and create an HTML element for each
    cars.forEach(function(car) {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');

        // If no image is provided, use a placeholder image
        const imageUrl = car.image ? car.image : 'https://via.placeholder.com/200';

        // Create the car card HTML
        carCard.innerHTML = `
            <img src="${imageUrl}" alt="${car.name}" width="200" class="car-image">
            <h3>${car.name || 'Unknown Car'}</h3>
            <p>Model: ${car.model || 'N/A'}</p>
            <p>Price: $${car.price ? car.price.toLocaleString() : 'N/A'}</p>
            <button onclick="updateCar(${car.id})">Edit</button>
            <button onclick="deleteCar(${car.id})" style="background:red;">Delete</button>
        `;

        carList.appendChild(carCard); // Add car to the page
    });
}

// Search function to filter cars by name or model
searchBtn.addEventListener('click', function() {
    const query = searchInput.value.trim().toLowerCase(); // Get the search input

    if (!query) {
        renderCars(allCars); // If empty, show all cars
        return;
    }

    // Filter cars based on user input
    const filteredCars = allCars.filter(function(car) {
        return (
            (car.name && car.name.toLowerCase().includes(query)) ||
            (car.model && car.model.toLowerCase().includes(query))
        );
    });

    renderCars(filteredCars); // Display only the filtered cars
});
