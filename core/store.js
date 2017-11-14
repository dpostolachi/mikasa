const { applyMiddleware, createStore } = require('redux')
const ReduxThunk = require('redux-thunk')
const Promise = require('redux-promise-middleware')
const middleware = applyMiddleware(Promise.default(), ReduxThunk)

module.exports = (config) => {
    return createStore(config.reducer, config.initialState, middleware);
}
