# Documentation is outdate, will update it soon.

## Demo
A simple demo of mikasa using iTunes Api: [Demo](https://mikasa-app.herokuapp.com)

# mikasa
A simple wrapper for server side rendering isomorphic react. It uses Koa.js as webserver, Redux and React-router for routing.

## Configuration

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| port          | Number             | The port that webserver will run on |
| routes        | Array              | An Array of Route Objects |
| static        | Object             | An configuration object |
| layout        | React Component    | The React Component that will be used as layout |
| store         | Object             | An Object containing the redux reducer and the initialState |
| promises       | Array             | An array of promises that need to be resolved before any render from server side |


## Routes
Routes are based on routes from react-router, they must be specified as an array of objects that must contain the following attributes.

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| path          | String             | The route path, for example: /about |
| exact        | Boolean              | Exact parameter from react-router |
| component        | React Component             | The component that will be rendered for that route |
| loadData        | Function    | A function used for doing asynchronus actions before the render of the component. It must return a promise or an array of promises. The function takes three parameters: The context parameter from koa that contains the request, a shared object, and the redux store object for the dispatches before the render.  |

## Static
The static object must contain the following attributes.

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| path          | String             | The path that will be used in browser, for exmaple: /public |
| local        | String              | The path to folder containing the static files. |
| options        | Object            | This object is used as options for koa-static. example: { gzip: true } |

## Store
The store object is used to create the redux storage on the backend. It must contain the following attributes:

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| reducer          | Function             | It can be a simple reducer or a combined reducer. |
| initialState        | Object              | This will be used as initialState for the redux. |

## Example
```javascript

import initialState from './store/default'
import reducer from './reducers'
import Layout from './components/layout'
const mikasa = require('mikasa')

mikasa({
        port: 3002,
        routes: routes,
        static: {
            path: '/public',
            local: './static',
            options: {
                gzip: true,
            }
        },
        layout: Layout,
        store: {
            initialState: initialState,
            reducer: reducer,
        },
        promises: [],
    })
}

```
# Usage in browser
For the the browser usage import mikasa/browser. The configuration object is similar to the server one and it must contain the following attributes:

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| reducer          | Function        | It can be a simple reducer or a combined reducer. |
| routes        | Array              | An Array of Route Objects. |
| layout        | React Component    | The React Component that will be used as layout. |

# Example in browser

```javascript
import mikasa from 'mikasa/browser'
import reducer from '/reducers'
import routes from '/routes'
import layout from '/components/layout'

mikasa({
    reducer: reducer,
    routes: routes,
    layout: layout,
})
```

