const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const swaggerJSON = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')

const app = express();

// Setup logger parser and many more
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routing
const tesRouter = require('./routes/tes');
const apiRouter = require('./routes/api');
app.use('/tes', tesRouter);
app.use('/api', apiRouter)

module.exports = app;
