class Api {
  constructor({apiMainUrl, headers}) {
    this._apiMainUrl = apiMainUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return(res.ok) ? res.json() : Promise.reject(`Ошибка! => ${res.status}`);
  }
  async _request(url, config) {
    return await fetch(`${this._apiMainUrl}${url}`, config)
      .then((res) => this._checkResponse(res));
  }
  getCards() {
    return this._request('/cards', {
      headers: this._headers
    });
  }
  getUserInfo() {
    return this._request('/users/me', {
      headers: this._headers,
      method: 'GET'
    });
  }
  patchUserInfo(name, about) {
    return this._request('/users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }
  postCard(name, link) {
    return this._request('/cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }
  deleteCard(_id) {
    return this._request(`/cards/${_id}`, {
      headers: this._headers,
      method: 'DELETE'
    });
  }
  putLike(_id) {
    return this._request(`/cards/${_id}/likes`, {
      headers: this._headers,
      method: 'PUT'
    });
  }
  deleteLike(_id) {
    return this._request(`/cards/${_id}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    });
  }
  patchAvatar(avatar) {
    return this._request(`/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }
}

const NewApi = new Api({
  apiMainUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: { 
    authorization: 'fb254d0d-24c1-470a-bc0c-68d2d2e3fa16',
    'Content-type': 'application/json',
  },
});
export default NewApi;