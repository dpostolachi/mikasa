const { StaticRouter } = require('react-router')
const { renderToString } = require('react-dom/server')
const getStore = require('./store')
const React = require('react')
const router = require('koa-router')()
const AppRouter = require('./router')

module.exports = (app, opts) => {

    const { routes, promises, store, layout, nativeRoutes } = opts

    nativeRoutes.forEach((route) => {
        switch(route.method){
            case 'GET':
                router.get(route.path, route.fn)
            break
            case 'PUT':
                router.put(route.path, route.fn)
            break
            case 'POST':
                router.post(route.path, route.fn)
            break
            case 'OPTIONS':
                router.options(route.path, route.fn)
            break
            case 'DELETE':
                router.delete(route.path, route.fn)
            break
            default:
                throw `Unrecognized method: ${route.method}`
            break
        }
    })

    routes.forEach((route) => {

        router.get(route.path, async (ctx) => {

            const STORE = getStore(store)
            
            const share = {}

            await Promise.all(
                promises.map((promise) => {
                    return promise(ctx, share, STORE)
                }).concat(route.loadData(ctx, share, STORE))
            )

            return ctx.body = '<!DOCTYPE html>' + renderToString(
                React.createElement(
                    StaticRouter,
                    { location: ctx.url, context: share },
                    React.createElement(AppRouter, { routes: routes, AppLayout: layout, store: STORE })
                )
            )

        })
    })

    app.use(router.routes())

}