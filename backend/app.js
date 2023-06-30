const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middlewares/logger');

const cards = require('./routes/cards');
const users = require('./routes/users');
const pageNotFound = require('./routes/pageNotFound');
const auth = require('./routes/auth');
const { checkAuthorizedUser } = require('./middlewares/auth');
const handleServerError = require('./middlewares/handleServerError');
const filterCors = require('./middlewares/cors');

require('dotenv').config();

const { PORT = 3000, MONGO_DB_URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(filterCors);

app.get('/crash-test', () => {
  setTimeout(() => {
    console.log('crash');
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); 

app.use('/cards', checkAuthorizedUser, cards);
app.use('/users', checkAuthorizedUser, users);
app.use('/', auth);
app.use('*', pageNotFound);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(handleServerError);

app.listen(PORT);
