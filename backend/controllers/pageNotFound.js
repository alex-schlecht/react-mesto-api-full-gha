const PageNotFound = require('../errors/PageNotFound');

module.exports.pageNotFound = (req, res, next) => {
  next(new PageNotFound('Page Not Found'));
};
