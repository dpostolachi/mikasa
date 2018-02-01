import { StaticRouter } = from 'react-router'
import { Provider } = 'react-redux'
import { Route, Switch } = from 'react-router'
import React from 'react'
import PreloadedState from './preloadedState'

export default ( props ) => {
    let { router, AppLayout, store } = props

    //Flattening routes
    routes = [].concat.apply( [], ( routes || [] ) )

    return (
        <Provider store={ store }>
            <AppLayout>
                <Switch>
                    { routes.map( ( route, key ) => {
                        const { path, component, exact } = route
                        return <Route key={ key } path={ path } component={ component } exact={ exact } />
                    } ) }
                </Switch>
                <PreloadedState store={ store } />
            </AppLayout>
        </Provider>
    )

}
