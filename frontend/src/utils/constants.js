const { NODE_ENV } = process.env;
module.exports.API_URL = NODE_ENV === 'production' ? 'api.mestoapi.nomoreparties.sbs' : 'http://localhost:3000';
