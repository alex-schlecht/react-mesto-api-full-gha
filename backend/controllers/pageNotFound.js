const PageNotFound = require('../errors/PageNotFound');

module.exports.PageNotFound = (req, res, next) => {
  next(new PageNotFound('Page Not Found'));
};
