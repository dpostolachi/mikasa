'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opts) {
    var path = opts.path,
        options = opts.options;

    return (0, _koaStatic2.default)(path, options || {});
};