require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pe = require('parse-error');
const cors = require('cors');
const v1 = require('./routes/v1');
const app = express();

// middleware return body as json and url encode
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// disable cache
app.disable('view cache');

// CORS
app.use(cors());

// Route to API links
app.use('/v1', cors(), v1);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

// This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Uncaught Error:', pe(error));
});

module.exports = app;
