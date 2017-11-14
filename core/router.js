const { StaticRouter } = require('react-router')
const { Provider } = require('react-redux')
const { Route, Switch } = require('react-router')
const React = require('react')
const PreloadedState = require('./preloadedState')

module.exports = (props) => {

    let {
        routes,
        AppLayout,
        store
    } = props


    routes = [].concat.apply([], (routes || []))

    return (
        React.createElement(
            Provider,
            { store: store },
            React.createElement(
                AppLayout,
                null,
                React.createElement(
                    Switch,
                    null,
                    routes.map(function (route, key) {
                        return React.createElement(Route, { key: key, path: route.path, component: route.component, exact: route.exact ? true : false });
                    })
                ),
                React.createElement(PreloadedState, { store: store })
            )
        )
    )
}