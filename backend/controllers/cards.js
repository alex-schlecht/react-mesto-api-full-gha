const Card = require('../models/card');
const Forbidden = require('../errors/Forbidden');
const { errorHandler } = require('../utils/utils');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send({ card }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  const deleteCard = (_id) => Card.findOneAndDelete(_id);
  Card.findById({ _id: cardId })
    .orFail()
    .then((card) => {
      if (card.owner._id.valueOf() !== userId) {
        return next(new Forbidden('Доступ запрещён'));
      }
      return deleteCard(card._id)
        .then((remCard) => res.send(remCard));
    })
    .catch((err) => errorHandler(err, res, next));
};

module.exports.likeCard = (req, res, next) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  ).orFail()
    .populate('likes')
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.removeLikeCard = (req, res, next) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: _id } },
    { new: true },
  ).orFail()
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res, next));
};
