const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  login,
  createUser,
  logout,
} = require('../controllers/users');
const { URI_REGEX } = require('../utils/constants');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); 

router.post('/signin', celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(URI_REGEX),
  }),
}), createUser);

router.get('/signout', logout);

module.exports = router;
