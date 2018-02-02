import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class Thumb extends Component {
    render () {
        const {
            artistName,
            image,
            price,
            preview,
            trackName,
            date,
        } = this.props
        return (
            <div className='thumb'>
                <div className='thumbArt'>
                    <a className='fa fa-play' target='_blank' href={ preview }>
                        <img src={ image } alt={ `${artistName} - ${trackName}` } title={ `${artistName} - ${trackName}` } />
                    </a>
                </div>
                <div className='thumbDetails'>
                    <span className='thumbTitle'>{ trackName }</span>
                    <Link to={ `/search?term=${ artistName }` } className='thumbArtist'>{ artistName }</Link>
                    <span className='thumbDate'>{ moment(date).format('YYYY') }</span>
                </div>
            </div>
        )
    }
}
