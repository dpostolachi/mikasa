import 'font-awesome/css/font-awesome.min.css'
import '/client/main.styl'
import mikasa from 'mikasa/dist/browser'
import reducer from '/reducers'
import routes from '/routes'
import layout from '/components/layout'

mikasa({
    reducer: reducer,
    routes: routes,
    layout: layout,
})
