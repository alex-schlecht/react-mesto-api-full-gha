const router = require('express').Router();
const { pageNotFound } = require('../controllers/PageNotFound');

router.all('/*', pageNotFound);

module.exports = router;
