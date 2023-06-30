import { API_URL } from "./constants";

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

export const checkToken = () => fetch(`${API_URL}/users/me`, {
  method: 'GET',
  credentials: "include",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then((res) => validationResponse(res))
  .then((data) => data);


export const register = (email, password) => fetch(`${API_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({email, password}),
})
  .then((res) => validationResponse(res));


export const authorize = (email, password) => fetch(`${API_URL}/signin`, {
  method: 'POST',
  credentials: "include",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({email, password}),
})
.then((res) => validationResponse(res));

export const logout = () => fetch(`${API_URL}/signout`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then((res) => validationResponse(res));
