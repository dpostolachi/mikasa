import Home from '/pages/home'
import Search from '/pages/search'
import { fetchSongsByTerm } from '/actions/songs'

export default [
    {
        path: '/search',
        exact: true,
        component: Search,
        loadData: ( ctx, Store, _ ) => {
            const term = ctx.query.term || ''
            return [
                Store.dispatch(fetchSongsByTerm(term)),
            ]
        }
    },
    {
        path: '/',
        exact: true,
        component: Home,
        loadData: () => {
            return [
                true,
            ]
        }
    },
]
