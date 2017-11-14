import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'
import getStore from './store'
import React from 'react'
const router = require('koa-router')()

import AppRouter from './router'

module.exports = (app, opts) => {

    const { routes, promises, store, layout } = opts

    routes.forEach((route) => {

        router.get(route.path, async (ctx) => {

            const STORE = getStore(store)
            
            const share = {}

            await Promise.all(promises.concat(route.loadData(ctx, share, STORE)))

            return ctx.body = '<!DOCTYPE html>' + renderToString(<StaticRouter location={ctx.url} context={share}><AppRouter routes={routes} AppLayout={layout} store={STORE} /></StaticRouter>)

        })
    })

    app.use(router.routes())

}