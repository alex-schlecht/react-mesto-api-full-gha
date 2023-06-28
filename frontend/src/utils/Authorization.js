export const BASE_URL = 'https://auth.nomoreparties.co';

const validationResponse = (response) => {
  if(!response.ok) {
    return response
      .json()
      .then((data) => ({data: data}))
      .then((res) => {
        return Promise.reject(`Ошибка: ${res.data.error || res.data.message}`);
      })
  }
  return response.json();
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => validationResponse(res))
    .then((data) => data);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then((res) => validationResponse(res));
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
  .then((res) => validationResponse(res));
};
