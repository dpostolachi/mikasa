const React = require('react')
const serialize = require('serialize-javascript')

module.exports = (props) => {
    return React.createElement("script", {
        id: "preloadedState",
        type: "text/javascript",
        dangerouslySetInnerHTML: { __html: 'window.__PRELOADED_STATE__ = ' + serialize(props.store.getState(), { isJSON: true }) }
    });
}