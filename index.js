/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var koa = __webpack_require__(4);
var app = new koa();
var router = __webpack_require__(1)();
var mount = __webpack_require__(5);
var serveStatic = __webpack_require__(6);

exports.default = function (opts) {
    var routes = [].concat.apply([], opts.routes || []);

    app.use(mount(opts.static.path, serveStatic({
        path: opts.static.local,
        options: opts.static.options
    })));

    __webpack_require__(8)(app, {
        routes: routes,
        store: opts.store,
        promises: opts.promises,
        layout: opts.layout
    });

    app.listen(opts.port);
    console.log("Listening on port", opts.port);
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var serve = __webpack_require__(7);

module.exports = function (opts) {
    return serve(opts.path, opts.options || {});
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reactRouter = __webpack_require__(2);

var _server = __webpack_require__(9);

var _store = __webpack_require__(10);

var _store2 = _interopRequireDefault(_store);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(14);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = __webpack_require__(1)();

module.exports = function (app, opts) {
    var routes = opts.routes,
        promises = opts.promises,
        store = opts.store,
        layout = opts.layout;


    routes.forEach(function (route) {

        router.get(route.path, async function (ctx) {

            var STORE = (0, _store2.default)(store);

            var share = {};

            await Promise.all(promises.concat(route.loadData(ctx, share, STORE)));

            return ctx.body = '<!DOCTYPE html>' + (0, _server.renderToString)(_react2.default.createElement(
                _reactRouter.StaticRouter,
                { location: ctx.url, context: share },
                _react2.default.createElement(_router2.default, { routes: routes, AppLayout: layout, store: STORE })
            ));
        });
    });

    app.use(router.routes());
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(11);

var _reduxThunk = __webpack_require__(12);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPromiseMiddleware = __webpack_require__(13);

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default);

exports.default = function (config) {
    // console.log('is', initialState)
    // console.log('red', reducer)
    return (0, _redux.createStore)(config.reducer, config.initialState, middleware);
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("redux-promise-middleware");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRouter = __webpack_require__(2);

var _reactRedux = __webpack_require__(15);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _preloadedState = __webpack_require__(16);

var _preloadedState2 = _interopRequireDefault(_preloadedState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    var routes = props.routes,
        AppLayout = props.AppLayout,
        store = props.store;


    routes = [].concat.apply([], routes || []);

    console.log("GGGG", props);

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
                    return _react2.default.createElement(_reactRouter.Route, { key: key, path: route.path, component: route.component, exact: route.exact ? true : false });
                })
            ),
            _react2.default.createElement(_preloadedState2.default, { store: store })
        )
    );
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _serializeJavascript = __webpack_require__(17);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return _react2.default.createElement('script', {
        id: 'preloadedState',
        type: 'text/javascript',
        dangerouslySetInnerHTML: { __html: 'window.__PRELOADED_STATE__ = ' + (0, _serializeJavascript2.default)(props.store.getState(), { isJSON: true }) }
    });
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ })
/******/ ]);