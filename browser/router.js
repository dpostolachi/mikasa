import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import React from 'react'
import PreloadedState from './preloadedState'

export default (props) => {

    let {
        routes,
        AppLayout,
        store
    } = props


    routes = [].concat.apply([], (routes || []))

    return (
        <Provider store={store}>
            <AppLayout>
                <Switch>
                    {routes.map((route, key) => {
                        return <Route key={key} path={route.path} component={route.component} exact={(route.exact) ? true : false} />
                    })}
                </Switch>
                <PreloadedState store={store} />
            </AppLayout>
        </Provider>
    )
}