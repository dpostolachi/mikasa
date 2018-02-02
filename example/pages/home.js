import React, { Component } from 'react'

export default class Home extends Component {
    render () {
        return (
            <form action='/search' className='searchForm' method='get'>
                <h1>Search for a song</h1>
                <input placeholder='Name of the song or artist' name='term' type='text' />
                <button type='submit'>Search</button>
            </form>
        )
    }
}
