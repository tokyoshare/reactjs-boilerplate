if (process.env.NODE_ENV === 'production') {
    module.exports = require('./ConfigureStore.prod');
} else {
    module.exports = require('./ConfigureStore.dev');
}
