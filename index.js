const koa = require('koa')
const app = new koa()
const router = require('koa-router')()
const mount = require('koa-mount')
const serveStatic = require('./core/static')


module.exports = ((opts) => {
    const routes = [].concat.apply([], (opts.routes || []))

    app.use(
        mount(
            opts.static.path,
            serveStatic({
                path: opts.static.local,
                options: opts.static.options,
            })
        )
    )

    require('./core/render')(app, {
        routes: routes,
        store: opts.store,
        promises: opts.promises,
        layout: opts.layout
    })

    app.listen(opts.port)

})