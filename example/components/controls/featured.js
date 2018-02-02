import React, { Component } from 'react'
import { connect } from 'react-redux'
import Thumb from 'components/blocks/thumb'

@connect( ( store ) => {
    return {
        songs: store.songs.featured,
    }
} )

export default class Featured extends Component {
    render() {
        const { songs } = this.props
        return (
            <div className='featured'>
                <h3>Featured songs</h3>
                {
                    songs.map( ( song, key ) => {
                        return <Thumb key={ key } { ...song } />
                    } )
                }
            </div>
        )
    }
}
