//Main App

import React from 'react';

import { hydrate } from 'react-dom';

import ReduxThunk from 'redux-thunk'

import { applyMiddleware, createStore } from 'redux'

import Promise from 'redux-promise-middleware'

import { BrowserRouter } from 'react-router-dom'

import AppRouter from '../core/router'

const middleware = applyMiddleware(Promise(), ReduxThunk)

export default (opts) => {

    const preloadedState = window.__PRELOADED_STATE__

    delete window.__PRELOADED_STATE__

    const Store = createStore(opts.reducer, preloadedState, middleware)
    
    hydrate(<BrowserRouter><AppRouter AppLayout={ opts.layout } routes={opts.routes} store={Store} /></BrowserRouter>, document);

}