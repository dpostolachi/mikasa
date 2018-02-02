import axios from 'axios'

const APIURL = (process.env.NODE_ENV === 'production') ? 'https://mikasa-app.herokuapp.com/api' : 'http://localhost:4000/api'

export const fetchSongsByTerm = ( term ) => {

    return ( dispatch ) => {

        dispatch({
            type: 'FETCH_SONGS_BY_TERM_STARTED',
        })

        return axios.get(APIURL, {
            params: {
                term: term,
            }
        })

        .then( ( resp ) => {
            return dispatch( {
                type: 'FETCH_SONGS_BY_TERM_FULFILLED',
                payload: resp.data
            } )
        } )

    }

}

export const fetchFeaturedSongs = ( ) => {

    return ( dispatch ) => {

        dispatch({
            type: 'FETCH_FEATURED_SONGS_STARTED',
        })

        return axios.get(APIURL, {
            params: {
                featured: 'yes',
            }
        })

        .then( ( resp ) => {
            return dispatch( {
                type: 'FETCH_FEATURED_SONGS_FULFILLED',
                payload: resp.data
            } )
        } )

    }

}
