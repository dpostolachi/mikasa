## Demo
A simple demo of mikasa using iTunes Api: [Demo](https://mikasa-app.herokuapp.com)

# mikasa
A simple wrapper for server side rendering isomorphic react. It uses Koa.js as webserver, Redux, Redux-thunk and React-router for routing.

## Example
This is the code from the example:
```javascript
import initialState from '/store/default'
import reducer from '/reducers'
import Layout from '/components/layout'
import routes from '/routes'
import ITunesProxy from '/routes/itunes'
import { fetchFeaturedSongs } from '/actions/songs'
const mikasa = require('mikasa')

const app = new mikasa()
app.addNativeRoute('get', '/api', ITunesProxy)
app.addStatic({
    path: '/public',
    local: './public',
    options: {
        gzip: true,
    }
})
app.setLayout(Layout)
app.setStore({
    initialState: initialState,
    reducer: reducer
})
app.addPromise((ctx, Store, _) => {
    return [
        Store.dispatch(fetchFeaturedSongs())
    ]
})
app.addRoute(routes)

const PORT = process.env.PORT || 3000

app.listen(PORT)
```

## Adding routes
For routing react components use the 'addRoute' method it can accept an array or a route.
```javascript
app.addRoute([
   {
      path: '/',
      exact: true,
      component: Home,
      loadData: (ctx, Store, shared) => {
         return [ ArrayOfPromises ],
      }
   }
])
```

## Routes
Routes are based on routes from react-router, they must be specified as an array of objects that must contain the following attributes.

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| path          | String             | The route path, for example: /about |
| exact        | Boolean              | Exact parameter from react-router |
| component        | React Component             | The component that will be rendered for that route |
| loadData        | Function    | A function used for doing asynchronus actions before the render of the component. It must return a promise or an array of promises. The function takes three parameters: The context parameter from koa that contains the request, the redux store object for the dispatches before the render and a shared object.  |

## Adding statics
To add statics use the 'addStatic' method. Just like the routes, you can pass an object or an array of objects.
```javascript
app.addStatic({
    path: '/public',
    local: './public',
    options: {
        gzip: true,
    }
})
```

## Static
The static object must contain the following attributes. It's based on koa-static package.

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| path          | String             | The path that will be used in browser, for exmaple: /public |
| local        | String              | The path to folder containing the static files. |
| options        | Object            | This object is used as options for koa-static. example: { gzip: true } |

## Adding a redux store
To set the redux store use the 'setStore' method. The store will be passed to the client application.
```javascript
app.setStore({
    initialState: initialState,
    reducer: reducer
})
```


## Store
The store object is used to create the redux storage on the backend. It must contain the following attributes:

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| reducer          | Function             | It can be a simple reducer or a combined reducer. |
| initialState        | Object              | This will be used as initialState for the redux. |

# Usage in browser
For the the browser usage import mikasa/dist/browser. The configuration object is similar to the server one and it must contain the following attributes:

| Parameters    | Type               | Description  |
| ------------- |:------------------:| ----- |
| reducer          | Function        | It can be a simple reducer or a combined reducer. |
| routes        | Array              | An Array of Route Objects. |
| layout        | React Component    | The React Component that will be used as layout. |

# Example in browser

```javascript
import mikasa from 'mikasa/dist/browser'
import reducer from '/reducers'
import routes from '/routes'
import layout from '/components/layout'

mikasa({
    reducer: reducer,
    routes: routes,
    layout: layout,
})
```

