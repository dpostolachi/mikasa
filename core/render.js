import React from 'react'
import koaRouter from 'koa-router'
import AppRouter from './router'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'
import getStore from './store'

const router = koaRouter()

export default ( app, opts ) => {

    const { routes, promises, store, layout, nativeRoutes } = opts

    nativeRoutes.forEach( ( route ) => {
        switch( route.method.toUpperCase() ){
            case 'GET':
                router.get( route.path, route.fn )
            break
            case 'PUT':
                router.put( route.path, route.fn )
            break
            case 'POST':
                router.post( route.path, route.fn )
            break
            case 'OPTIONS':
                router.options( route.path, route.fn )
            break
            case 'DELETE':
                router.delete( route.path, route.fn )
            break
            default:
                throw(`Unrecognized method: ${route.method}`)
            break
        }
    })

    routes.forEach( ( route ) => {

        router.get( route.path, async (ctx) => {

            const STORE = getStore(store)

            const share = {}

            const preRenderPromises = [].concat.apply([], promises.concat( route.loadData ).map( ( promise ) => {
                return promise( ctx, STORE, share)
            }))

            await Promise.all( preRenderPromises )

            return ctx.body = '<!DOCTYPE html>' + renderToString(
                <StaticRouter location={ ctx.url } context={ share }>
                    <AppRouter routes={ routes } AppLayout={ layout } store={ STORE } />
                </StaticRouter>
            )

        })
    })

    app.use( router.routes() )

}
