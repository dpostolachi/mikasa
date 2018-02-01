'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reduxPromiseMiddleware = require('redux-promise-middleware');

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reactRouterDom = require('react-router-dom');

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default); //Main App

exports.default = function (opts) {

    var preloadedState = window.__PRELOADED_STATE__;

    delete window.__PRELOADED_STATE__;

    var Store = (0, _redux.createStore)(opts.reducer, preloadedState, middleware);

    (0, _reactDom.hydrate)(_react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(_router2.default, { AppLayout: opts.layout, routes: opts.routes, store: Store })
    ), document);
};