'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return _react2.default.createElement('script', {
        id: 'preloadedState',
        type: 'text/javascript',
        dangerouslySetInnerHTML: { __html: 'window.__PRELOADED_STATE__ = ' + (0, _serializeJavascript2.default)(props.store.getState(), { isJSON: true }) }
    });
};