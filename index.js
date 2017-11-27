const koa = require('koa')
const mount = require('koa-mount')
const serveStatic = require('./core/static')

module.exports = class Mikasa {
    constructor() {

        // Default configs
        this._app = new koa()
        this._routes = []
        this._nativeRoutes = []
        this._statics = []
        this._layout = null
        this._store = null
        this._middlewares = []
        this._promises = []

        return this
    }

    addRoute(route) {

        // Test if its array
        if (Array.isArray(route)) {
            for (const _route of route) {
                this.addRoute(_route)
            }
        } else {
            this.testRoute(route)
            this._routes.push(route)
        }
        return this
    }

    addNativeRoute(method, path, fn) {
        this._nativeRoutes.push({
            method: method,
            path: path,
            fn: fn,
        })
        return this
    }

    post(path, fn) {
        this.addNativeRoute("POST", path, fn)
    }

    get(path, fn) {
        this.addNativeRoute("GET", path, fn)
    }

    put(path, fn) {
        this.addNativeRoute("PUT", path, fn)
    }

    delete(path, fn) {
        this.addNativeRoute("DELETE", path, fn)
    }

    options(path, fn) {
        this.addNativeRoute("OPTIONS", path, fn)
    }

    head(path, fn) {
        this.addNativeRoute("HEAD", path, fn)
    }

    testRoute(route) {
        if (typeof route.path !== 'string')
            throw `Route path must be a string, got ${typeof route}`
        if (typeof route.component !== 'function')
            throw `Route component must be a react component, got ${typeof route.component}`
        return
    }

    testStatic(staticObj) {
        if (typeof staticObj.path !== 'string')
            throw `Static path must be a string, got ${typeof staticObj.path}`
        if (typeof staticObj.local !== 'string')
            throw `Static local must be a string, got ${typeof staticObj.local}`
        if (typeof staticObj.options !== 'object')
            throw `Static options must be an object, got ${typeof staticObj.options}`
        return
    }

    addMiddleware(middleware) {
        this._middlewares.push(middleware)
        return this
    }

    addStatic(statics) {
        if (Array.isArray(statics)) {
            for (const _static of statics) {
                this.addStatic(_static)
            }
        } else {
            this.testStatic(statics)
            this._statics.push(statics)
        }
        return this
    }

    setLayout(layout) {
        if (typeof layout !== 'function')
            throw `Layout must be an React Component, got ${typeof layout}`
        this._layout = layout
        return this
    }

    setStore(store) {
        if (typeof store.initialState === 'undefined')
            throw 'Store initialState must be an object or an aray, got undefined'
        if (typeof store.reducer !== 'function')
            throw `Store reducer must be an function, got ${store.reducer}`

        this._store = store

        return this
    }

    addPromise(promise) {
        if (Array.isArray(promise)) {
            for (const _promise of promise)
                this.addPromise(_promise)
        } else
            this._promises.push(promise)
        return this
    }

    listen(port) {

        // Setting Port
        this._port = port || 3000

        if (this._layout == null)
            throw 'No layout was specified'
        if (this._store == null)
            throw 'No store was specified'

        // Pushing Static
        this._statics.forEach((_static) => {
            this._app.use(mount(
                _static.path,
                serveStatic({
                    path: _static.local,
                    options: _static.options
                })
            ))
        })

        // Pusjing middleware
        this._middlewares.forEach((middleware) => {
            this._app.use(middleware)
        })

        // Pushing routes
        require('./core/render')(this._app, {
            routes: this._routes,
            store: this._store,
            promises: this._promises,
            layout: this._layout,
            nativeRoutes: this._nativeRoutes,
        })

        console.log('Listening on port', this._port)

        this._app.listen(this._port)
    }

}