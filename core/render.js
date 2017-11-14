const { StaticRouter } = require('react-router')
const { renderToString } = require('react-dom/server')
const getStore = require('./store')
const React = require('react')
const router = require('koa-router')()

import AppRouter from './router'

module.exports = (app, opts) => {

    const { routes, promises, store, layout } = opts

    routes.forEach((route) => {

        router.get(route.path, async (ctx) => {

            const STORE = getStore(store)
            
            const share = {}

            await Promise.all(promises.concat(route.loadData(ctx, share, STORE)))

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