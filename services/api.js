// For Winblows and Linuxxx
// require('dotenv').config();
// const apiKey = process.env.SOME_API_KEY;
const apiKey = 'K0ACWNU09ihIYSJfG0UmG4u99d9Oj2Da';

// For Everybody! :->
const URL = 'http://localhost:3000/api';

export {
  signIn,
  signUp,
  searchRecipes,
  getRecipe,
  getFoods,
  getShoppingList,
  addToShoppingList,
  updateShoppingList,
  getFavorites,
  addToFavoritesList,
  clearItemsFromShoppingList,
  clearShoppingList,
  getMonths
};

function responseHandler(response) {
  console.log('response is', response);
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

/////////////LOGIN////////////////////////////
// SIGN-IN
function signIn(creds) {
  return fetch(`${URL}/auth/signin`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(creds)
  })
    .then(responseHandler);
}

// SIGN-UP
function signUp(creds) {
  return fetch(`${URL}/auth/signup`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(creds)
  })
    .then(responseHandler);
}

///////////RECIPES////////////////
// SEARCH RECIPES
function searchRecipes(ingredient) {
  const url = 'http://api2.bigoven.com/recipes?pg=1&rpp=5&any_kw=' +
  encodeURIComponent(ingredient) + 
  '&api_key=' + apiKey;
  return fetch(url)
    .then(response => response.json());
}

// GET RECIPES
function getRecipe(recipeId) {
  const url = 'http://api2.bigoven.com/recipe/' + recipeId + '?api_key=' + apiKey;
  return fetch(url)
    .then(response => response.json());
}

////////////////////SEASON/////////////
// GET FOODS
function getFoods() {
  return fetch(`${URL}/search`, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

/////////////SHOPPING_LIST///////////////
// GET SHOPPING_LIST
function getShoppingList(userid) {
  console.log('user is ', userid);
  return fetch(`${URL}/list/${userid}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

// ADD TO SHOPPING_LIST
function addToShoppingList(ingredients) {
  console.log('ingredients are', ingredients);
  return fetch(`${URL}/list`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(ingredients)
  })
    .then(responseHandler);
}

// UPDATE SHOPPING_LIST
function updateShoppingList(newList) {
  console.log('in the api', newList);
  return fetch(`${URL}/list/update`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(newList)
  })
    .then(responseHandler);
}

// CLEAR ITEMS FROM SHOPPING_LIST
function clearItemsFromShoppingList(itemsPackage) {
  console.log('package is', JSON.stringify(itemsPackage.items));
  return fetch(`${URL}/list/update/${itemsPackage.userid}`, {
    method: 'DELETE',
    headers: getHeaders(true),
    body: JSON.stringify(itemsPackage.items)
  })
    .then(responseHandler);
}

// CLEAR SHOPPING_LIST
function clearShoppingList(id) {
  return fetch(`${URL}/list/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(responseHandler);
}

function getMonths(){
  return fetch(`${URL}/months`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}
////////////////////FAVORITES////////////
// GET FAVORITES
function getFavorites(userid) {
  return fetch(`${URL}/favorite-recipes/${userid}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

function addToFavoritesList(savedRecipes) {
  console.log('this is in api bobby', savedRecipes);
  return fetch(`${URL}/favorite-recipes`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(savedRecipes)
  })
    .then(responseHandler);
}


