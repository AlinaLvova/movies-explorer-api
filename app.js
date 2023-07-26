require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const handleErrors = require('./middlewares/errors');
const configureHelmet = require('./safety/configureHelmet');
//const cors = require('./middlewares/cors');
const { DB_ADDRESS } = require('./utils/config');

// подключаемся к серверу mongo
mongoose
  .connect(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Успешное подключение к базе данных');
  })
  .catch((error) => {
    console.log('Ошибка при подключении к базе данных:', error.name);
  });
// удалить log после ревью

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

// теперь клиент имеет доступ только к публичным файлам
app.use(express.static(path.join(__dirname, 'public')));

// middleware для обработки данных в формате JSON
app.use(express.json());

app.use(cookieParser());

configureHelmet(app);

app.use(require('./routes/index'));

app.use(handleErrors); // централизованный обработчик ошибок

app.listen(PORT, () => {
});
