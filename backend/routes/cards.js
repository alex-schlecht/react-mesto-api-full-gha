const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URI_REGEX } = require('../utils/constants');
const {
  getCards, createCard, likeCard, deleteCard, removeLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(URI_REGEX).required(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), removeLikeCard);

module.exports = router;
