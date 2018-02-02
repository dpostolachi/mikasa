import axios from 'axios'

export default async ( ctx ) => {

    const term = ( ctx.query.term && ctx.query.term.length > 2 ) ? ctx.query.term : ''
    const featured = ctx.query.featured === 'yes'

    if ( term || featured ) {

        return ctx.body = await axios.get('https://itunes.apple.com/search?term=jack+johnson&limit=25', {
            params: {
                term: (featured) ? 'timberlake' : term,
                media: 'music',
                limit: (featured) ? 4 : 24,
                country: 'US',
            }
        })

        .then( ( resp ) => {

            return resp.data.results.map( ( song ) => {

                return {
                    artistName: song.artistName,
                    image: song.artworkUrl100,
                    price: song.trackPrice,
                    preview: song.previewUrl,
                    trackName: song.trackName,
                    date: song.releaseDate,
                }

            } )

        } )

        .catch( ( _ ) => {

            return []

        } )

    } else

        return ctx.body =[]
}
