const URL = 'http://localhost:3000/api';

export {
  signIn,
  signUp
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
  return fetch(`${URL}/signin`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(creds)
  })
    .then(responseHandler);
}

function signUp(creds) {
  return fetch(`${URL}/signup`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(creds)
  })
    .then(responseHandler);
}
