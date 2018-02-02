import React, { Component } from 'react'
import FeaturedList from '/components/controls/featured'

export default class Layout extends Component {
    render () {
        const { children } = this.props
        return (
            <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Mikasa App Demo</title>
                <link rel="stylesheet" media="all" href="/public/bundle/style.css" />
            </head>
            <body>
                <div className='container'>
                    { children }
                    <FeaturedList />
                </div>
                <script src='/public/bundle/bundle.js' async/>
            </body>
            </html>
        )
    }
}
