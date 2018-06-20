// For Winblows and Linuxxx
// require('dotenv').config();
// const apiKey = process.env.API_KEY;
const apiKey = 'K0ACWNU09ihIYSJfG0UmG4u99d9Oj2Da';

// For Everybody! :->
const URL = 'http://localhost:3000/api';

export {
  signIn,
  signUp,
  searchRecipes,
  getRecipe,
  getFoods,
  addToShoppingList,
  updateShoppingList,
  getShoppingList,
  getFavorites,
  addToFavoritesList
};

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(err => {
    throw err.message;
  });
}

function getHeaders(hasBody) {
  const headers = {};
  if(hasBody) {
    headers['Content-Type'] = 'application/json';
  }

  const user = localStorage.user;
  if(user) {
    try {
      headers['Authorization'] = JSON.parse(user).id;
    }
    catch(err) {
      localStorage.removeItem('user');
    }
  }

  return headers;
}

function signIn(creds) {
  return fetch(`${URL}/auth/signin`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(creds)
  })
    .then(responseHandler);
}

function signUp(creds) {
  return fetch(`${URL}/auth/signup`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(creds)
  })
    .then(responseHandler);
}

function searchRecipes(ingredient) {
  const url = 'http://api2.bigoven.com/recipes?pg=1&rpp=5&any_kw=' +
  encodeURIComponent(ingredient) + 
  '&api_key=' + apiKey;
  return fetch(url)
    .then(response => response.json());
}

function getRecipe(ingredientId) {
  const url = 'http://api2.bigoven.com/recipe/' + ingredientId + '?api_key=' + apiKey;
  return fetch(url)
    .then(response => response.json());
}

function getFoods() {
  return fetch(`${URL}/search`, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

function addToShoppingList(ingredients) {
  console.log('ingredients are', ingredients);
  return fetch(`${URL}/list`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(ingredients)
  })
    .then(responseHandler);
}

function updateShoppingList(newList) {
  console.log('in the api', newList);
  return fetch(`${URL}/list`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(newList)
  })
    .then(responseHandler);
}

function getShoppingList(userid) {
  console.log('user is ', userid);
  return fetch(`${URL}/list/${userid}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

function getFavorites(userid) {
  return fetch(`${URL}/user/${userid}/favorite-recipes`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

function addToFavoritesList(savedRecipes) {
  return fetch(`${URL}/favorite-recipes`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(savedRecipes)
  })
    .then(responseHandler);
}

