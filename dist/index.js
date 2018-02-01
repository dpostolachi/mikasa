'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _static2 = require('./core/static');

var _static3 = _interopRequireDefault(_static2);

var _render = require('./core/render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Mikasa() {
        _classCallCheck(this, Mikasa);

        // Default configs
        this._app = new _koa2.default();
        this._routes = [];
        this._nativeRoutes = [];
        this._statics = [];
        this._layout = null;
        this._store = null;
        this._middlewares = [];
        this._promises = [];

        return this;
    }

    _createClass(Mikasa, [{
        key: 'addRoute',
        value: function addRoute(route) {

            // Test if its array
            if (Array.isArray(route)) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = route[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _route = _step.value;

                        this.addRoute(_route);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } else {
                this.testRoute(route);
                this._routes.push(route);
            }
            return this;
        }
    }, {
        key: 'addNativeRoute',
        value: function addNativeRoute(method, path, fn) {
            this._nativeRoutes.push({
                method: method,
                path: path,
                fn: fn
            });
            return this;
        }
    }, {
        key: 'post',
        value: function post(path, fn) {
            this.addNativeRoute("POST", path, fn);
        }
    }, {
        key: 'get',
        value: function get(path, fn) {
            this.addNativeRoute("GET", path, fn);
        }
    }, {
        key: 'put',
        value: function put(path, fn) {
            this.addNativeRoute("PUT", path, fn);
        }
    }, {
        key: 'delete',
        value: function _delete(path, fn) {
            this.addNativeRoute("DELETE", path, fn);
        }
    }, {
        key: 'options',
        value: function options(path, fn) {
            this.addNativeRoute("OPTIONS", path, fn);
        }
    }, {
        key: 'head',
        value: function head(path, fn) {
            this.addNativeRoute("HEAD", path, fn);
        }
    }, {
        key: 'testRoute',
        value: function testRoute(route) {
            if (typeof route.path !== 'string') throw 'Route path must be a string, got ' + (typeof route === 'undefined' ? 'undefined' : _typeof(route));
            if (typeof route.component !== 'function') throw 'Route component must be a react component, got ' + _typeof(route.component);
            return;
        }
    }, {
        key: 'testStatic',
        value: function testStatic(staticObj) {
            if (typeof staticObj.path !== 'string') throw 'Static path must be a string, got ' + _typeof(staticObj.path);
            if (typeof staticObj.local !== 'string') throw 'Static local must be a string, got ' + _typeof(staticObj.local);
            if (_typeof(staticObj.options) !== 'object') throw 'Static options must be an object, got ' + _typeof(staticObj.options);
            return;
        }
    }, {
        key: 'addMiddleware',
        value: function addMiddleware(middleware) {
            this._middlewares.push(middleware);
            return this;
        }
    }, {
        key: 'addStatic',
        value: function addStatic(statics) {
            if (Array.isArray(statics)) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = statics[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _static = _step2.value;

                        this.addStatic(_static);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            } else {
                this.testStatic(statics);
                this._statics.push(statics);
            }
            return this;
        }
    }, {
        key: 'setLayout',
        value: function setLayout(layout) {
            if (typeof layout !== 'function') throw 'Layout must be an React Component, got ' + (typeof layout === 'undefined' ? 'undefined' : _typeof(layout));
            this._layout = layout;
            return this;
        }
    }, {
        key: 'setStore',
        value: function setStore(store) {
            if (typeof store.initialState === 'undefined') throw 'Store initialState must be an object or an aray, got undefined';
            if (typeof store.reducer !== 'function') throw 'Store reducer must be an function, got ' + store.reducer;

            this._store = store;

            return this;
        }
    }, {
        key: 'addPromise',
        value: function addPromise(promise) {
            if (Array.isArray(promise)) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = promise[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _promise = _step3.value;

                        this.addPromise(_promise);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            } else this._promises.push(promise);
            return this;
        }
    }, {
        key: 'listen',
        value: function listen(port) {
            var _this = this;

            // Setting Port
            this._port = port || 3000;

            if (this._layout == null) throw 'No layout was specified';
            if (this._store == null) throw 'No store was specified';

            // Pushing Static
            this._statics.forEach(function (_static) {
                _this._app.use((0, _koaMount2.default)(_static.path, (0, _static3.default)({
                    path: _static.local,
                    options: _static.options
                })));
            });

            // Pusjing middleware
            this._middlewares.forEach(function (middleware) {
                _this._app.use(middleware);
            });

            // Pushing routes
            (0, _render2.default)(this._app, {
                routes: this._routes,
                store: this._store,
                promises: this._promises,
                layout: this._layout,
                nativeRoutes: this._nativeRoutes
            });

            console.log('Listening on port', this._port);

            this._app.listen(this._port);
        }
    }]);

    return Mikasa;
}();