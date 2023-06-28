const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { CastError } = require('mongoose').Error;
const Conflict = require('../errors/Conflict');
const User = require('../models/user');
const { errorHandler } = require('../utils/utils');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const JwtToken = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports.getUser = (req, res, next) => {
  const _id = req.params.userId;
  User.findById({ _id })
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((newUser) => {
      res.status(201).send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
        _id: newUser._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Такой email уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JwtToken,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        }).send({});
    })
    .catch((err) => next(err));
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res, next));
};
