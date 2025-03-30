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
