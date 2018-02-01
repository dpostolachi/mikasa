import React from 'react'
import serialize from 'serialize-javascript'

export default ( props ) => {
    return <script
        id='preloadedState'
        type='text/javascript'
        dangerouslySetInnerHTML= { { __html: 'window.__PRELOADED_STATE__ = ' + serialize( props.store.getState(), { isJSON: true } ) } }
    />
}
