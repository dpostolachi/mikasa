'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _preloadedState = require('./preloadedState');

var _preloadedState2 = _interopRequireDefault(_preloadedState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    var routes = props.routes,
        AppLayout = props.AppLayout,
        store = props.store;

    //Flattening routes

    routes = [].concat.apply([], routes || []);

    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            AppLayout,
            null,
            _react2.default.createElement(
                _reactRouter.Switch,
                null,
                routes.map(function (route, key) {
                    var path = route.path,
                        component = route.component,
                        exact = route.exact;

                    return _react2.default.createElement(_reactRouter.Route, { key: key, path: path, component: component, exact: exact });
                })
            ),
            _react2.default.createElement(_preloadedState2.default, { store: store })
        )
    );
};