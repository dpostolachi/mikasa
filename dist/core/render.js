'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _reactRouter = require('react-router');

var _server = require('react-dom/server');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)();

exports.default = function (app, opts) {
    var routes = opts.routes,
        promises = opts.promises,
        store = opts.store,
        layout = opts.layout,
        nativeRoutes = opts.nativeRoutes;


    nativeRoutes.forEach(function (route) {
        switch (route.method.toUpperCase()) {
            case 'GET':
                router.get(route.path, route.fn);
                break;
            case 'PUT':
                router.put(route.path, route.fn);
                break;
            case 'POST':
                router.post(route.path, route.fn);
                break;
            case 'OPTIONS':
                router.options(route.path, route.fn);
                break;
            case 'DELETE':
                router.delete(route.path, route.fn);
                break;
            default:
                throw 'Unrecognized method: ' + route.method;
                break;
        }
    });

    routes.forEach(function (route) {

        router.get(route.path, async function (ctx) {

            var STORE = (0, _store2.default)(store);

            var share = {};

            var preRenderPromises = [].concat.apply([], promises.concat(route.loadData).map(function (promise) {
                return promise(ctx, STORE, share);
            }));

            await Promise.all(preRenderPromises);

            return ctx.body = '<!DOCTYPE html>' + (0, _server.renderToString)(_react2.default.createElement(
                _reactRouter.StaticRouter,
                { location: ctx.url, context: share },
                _react2.default.createElement(_router2.default, { routes: routes, AppLayout: layout, store: STORE })
            ));
        });
    });

    app.use(router.routes());
};