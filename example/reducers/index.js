import { combineReducers } from 'redux'
import songs from 'reducers/songs'

export default combineReducers( {
    songs: songs,
} )
