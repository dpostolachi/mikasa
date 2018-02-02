export default ( state, action ) => {
    switch ( action.type ) {
        case 'FETCH_SONGS_BY_TERM_STARTED':
            return {
                ...state,
                pendingTerm: true,
            }
        case 'FETCH_SONGS_BY_TERM_FULFILLED':
            return {
                ...state,
                pendingTerm: false,
                searchResults: action.payload,
            }
        case 'FETCH_FEATURED_SONGS_STARTED':
            return {
                ...state,
                pendingFeatured: true,
            }
        case 'FETCH_FEATURED_SONGS_FULFILLED':
            return {
                ...state,
                pendingFeatured: false,
                featured: action.payload,
            }
        default:
            return { ...state }
    }
}
