import React, { Component } from 'react'
import { connect } from 'react-redux'
import Thumb from '/components/blocks/thumb'
import qs from 'query-string'
import { Link } from 'react-router-dom'
import {
    fetchSongsByTerm
} from '/actions/songs'

@connect( ( store ) => {
    return {
        results: store.songs.searchResults,
        pending: store.songs.pendingTerm,
    }
} )
export default class Search extends Component {
    componentWillMount () {
        this.props.dispatch( fetchSongsByTerm( this.getQuery() ) )
    }
    getQuery ( props ) {
        const params = qs.parse( ( typeof props !== 'undefined' ) ? props.location.search : this.props.location.search)
        return ( typeof params.term !== 'undefined' ) ? params.term : ''
    }
    componentWillReceiveProps ( nextProps ) {
        if ( this.getQuery() != this.getQuery( nextProps ) )
            this.props.dispatch( fetchSongsByTerm( this.getQuery( nextProps ) ) )
    }
    render() {
        const { results, pending } = this.props
        return (
            <div>
                <Link to='/'>
                    <button type='button'><span className='fa fa-chevron-left'/> Back</button>
                </Link>
                <h1>Search results for "{ this.getQuery() }"</h1>
                <div className={ ( pending ) ? 'searchResults pending' : 'searchResults' }>
                    {
                        results.map( ( song, key ) => {
                            return <Thumb key={ key } { ...song } />
                        } )
                    }
                </div>
            </div>
        )
    }
}
