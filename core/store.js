const { applyMiddleware, createStore } = require('redux')
const ReduxThunk = require('redux-thunk')
const Promise = require('redux-promise-middleware')
const middleware = applyMiddleware(Promise(), ReduxThunk)

export default (config) => {
    return createStore(config.reducer, config.initialState, middleware);
}
