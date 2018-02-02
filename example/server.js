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

const PORT = process.env.PORT || 4000

app.listen(PORT)
