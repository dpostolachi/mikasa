import { applyMiddleware, createStore } from 'redux'

import ReduxThunk from 'redux-thunk'

import Promise from 'redux-promise-middleware'

const middleware = applyMiddleware(Promise(), ReduxThunk)

export default (config) => {
    return createStore(config.reducer, config.initialState, middleware);
}
